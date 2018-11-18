import { Injectable } from '@angular/core';
import { Diary, Mood } from '../../models/note';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

// firebase key
const firebaseConfig = {
  apiKey: "AIzaSyCHMAxvrgWWo5qdVOfNx4uFjgj5FbRkEcI",
  authDomain: "spotlight-ccba9.firebaseapp.com",
  databaseURL: "https://spotlight-ccba9.firebaseio.com",
  projectId: "spotlight-ccba9",
  storageBucket: "spotlight-ccba9.appspot.com",
  messagingSenderId: "851163986099"
  };

@Injectable()
export class DataServiceProvider {
  private db: any;
  private diaries:Diary[] = [];
  private moods: Mood[] = [];
  private serviceObserver: Observer<Diary[]>;
  private clientObservable: Observable<Diary[]>;

  constructor() {
    let foo;
    //observable
    this.clientObservable = Observable.create(observerThatWasCreated => {
      this.serviceObserver = observerThatWasCreated;
    });
    // get diary data from firebase
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    let dataRef = this.db.ref('/Diaries');
    dataRef.on('value', snapshot => {
      this.diaries = []; 
      snapshot.forEach(childSnapshot => {
        let eachDiary = {
          key: childSnapshot.key,
          text: childSnapshot.val().text,
          timestamp : childSnapshot.val().timestamp,
          image: childSnapshot.val().image,
        };
        this.diaries.push(eachDiary);
      });
      this.notifySubscribers();
    });
    // get mood data from firebase
    let moodRef = this.db.ref('/Moods');
    dataRef.on('value', snapshot => {
      this.moods = []; 
      snapshot.forEach(childSnapshot => {
        let eachMood = {
          key: childSnapshot.key,
          type: childSnapshot.val().type,
          timestamp : childSnapshot.val().timestamp,
        };
        this.moods.push(eachMood);
      });
      this.notifySubscribers();
    });

  }

  public getObservable(): Observable<Diary[]> {
    return this.clientObservable;
  }

  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }

  public getEntries():Diary[] {
    let entriesClone = JSON.parse(JSON.stringify(this.diaries));
    return entriesClone;
  }

  public getDiaryByKey(key: string): Diary {
    for (let e of this.diaries) {
      if (e.key === key) {
        let clone = JSON.parse(JSON.stringify(e));
        return clone;
      }
    }
    return undefined;
  }

  private findDiaryByKey(key: string): Diary {
    for (let e of this.diaries) {
      if (e.key === key) {
         return e;
      }
    }
    return undefined;
  }

  // Delete Diary
  public removeDiary(key: string): void {
    for (let i = 0; i < this.diaries.length; i++) {
      let Key = this.diaries[i].key;
      if (Key === key) {
        this.diaries.splice(i, 1);
        break;
      }
    }
    let parentRef = this.db.ref('/Diaries');
    let childRef = parentRef.child(key);
    childRef.remove();
    this.notifySubscribers();
  }

  // Add Diary
  public addDiary(diary:Diary) {
    diary.timestamp = Date.now();
    //save
    let listRef = this.db.ref('/Diaries');
    let prefRef = listRef.push();
    let dataRecord = {
      text: diary.text,
      timestamp : diary.timestamp,
      image: diary.image
    };
    prefRef.set(dataRecord);
    this.notifySubscribers();
    console.log("Added an entry, the list is now: ", this.diaries);
  }

  // Update Diary
  public updateDiary(key: string, newDiary: Diary): void {
    let diaryToUpdate: Diary = this.findDiaryByKey(key); 
    diaryToUpdate.text = newDiary.text;
    diaryToUpdate.timestamp = Date.now();
    diaryToUpdate.image = newDiary.image;
    //save
    let parentRef = this.db.ref('/Diaries');
    let childRef = parentRef.child(key);
    childRef.set({
      text:  diaryToUpdate.text,
      timestamp: diaryToUpdate.timestamp,
      image: diaryToUpdate.image
    });
    this.notifySubscribers();
  }
}
