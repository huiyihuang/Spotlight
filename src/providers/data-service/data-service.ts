import { Injectable } from '@angular/core';
import { Diary, Mood } from '../../models/note';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  constructor(private camera: Camera) {
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
          year : childSnapshot.val().year,
          month : childSnapshot.val().month,
          day : childSnapshot.val().day,
          image: childSnapshot.val().image,
          hasimage: childSnapshot.val().hasimage,
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
          year : childSnapshot.val().year,
          month : childSnapshot.val().month,
          day : childSnapshot.val().day,
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

  public getDiaryByDate(): Diary[] {
    let diaries: Diary[] = [];
    //get today's date
    let today = new Date();
    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();
    for (let e of this.diaries) {
      if (e.year === year && e.month===month &&e.day===day) {
        diaries.push(JSON.parse(JSON.stringify(e)));
      }
    }
    return diaries;
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
    //get today's date
    let today = new Date();
    //save
    let listRef = this.db.ref('/Diaries');
    let prefRef = listRef.push();
    let dataRecord = {
      text: diary.text,
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      day: today.getDate().toString(),
      image: diary.image,
      hasimage: diary.hasimage
    };
    prefRef.set(dataRecord);
    this.notifySubscribers();
    console.log("Added an entry, the list is now: ", this.diaries);
  }

  // Update Diary
  public updateDiary(key: string, newDiary: Diary): void {
    let diaryToUpdate: Diary = this.findDiaryByKey(key); 
    diaryToUpdate.text = newDiary.text;
    diaryToUpdate.image = newDiary.image;
    diaryToUpdate.hasimage = newDiary.hasimage;
    //save
    let parentRef = this.db.ref('/Diaries');
    let childRef = parentRef.child(key);
    childRef.set({
      text: diaryToUpdate.text,
      image: diaryToUpdate.image,
      year: diaryToUpdate.year,
      month: diaryToUpdate.month,
      day: diaryToUpdate.day,
      hasimage: diaryToUpdate.hasimage
    });
    this.notifySubscribers();
  }

  // Add Photo from Album
  public addPhotoFromAlbum(diary: Diary) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    let previous = diary.image;
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        diary.image = 'data:image/jpeg;base64,' + imageData;   
      } else {
        diary.image = previous;
      }
     }, (err) => {
        diary.image = previous;
     });
  }
}
