import { Injectable, ViewChild } from '@angular/core';
import { Diary, Mood } from '../../models/note';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';

// firebase key
const firebaseConfig = {
  apiKey: "AIzaSyDMcM7o7nQVWRRdWrYIZZIrMt-WsfGV-1U",
  authDomain: "spotlight2-59f9f.firebaseapp.com",
  databaseURL: "https://spotlight2-59f9f.firebaseio.com",
  projectId: "spotlight2-59f9f",
  storageBucket: "spotlight2-59f9f.appspot.com",
  messagingSenderId: "487222076273"
  };

@Injectable()
export class DataServiceProvider {
  private db: any;
  private diaries:Diary[] = [];
  private moods: Mood[] = [];
  private serviceObserver: Observer<Diary[]>;
  private clientObservable: Observable<Diary[]>;
  public loadData: boolean = false;

  constructor(private camera: Camera, private alertCtrl: AlertController) {
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
    moodRef.on('value', snapshot => {
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
      console.log("this.loadData before flag:",this.loadData);
      this.loadData=true;
    });


  }

  public getObservable(): Observable<Diary[]> {
    return this.clientObservable;
  }

  private notifySubscribers(): void {
    this.serviceObserver.next(undefined);
  }

  //Get All Entries
  public getEntries():Diary[] {
    let entriesClone = JSON.parse(JSON.stringify(this.diaries));
    return entriesClone;
  }

  // Get All Moods
  public getMoods():Mood[] {
    let moodsClone = JSON.parse(JSON.stringify(this.moods));
    // console.log(this.moods);
    // console.log(this.diaries);
    return moodsClone;
  }

  // Get All Image Links
  public getImgs() {
    let allLinks = [];
    let imgLinks = [];
    for (let e of this.diaries) {
      if (e.hasimage === true) {
        allLinks.push(e.image)
      }
    }
    // Do the random selection only when the database has >10 imgs in total
    if (allLinks.length > 10) {
      allLinks = this.shuffle(allLinks);
      for (let i=1; i <=10; i++) {
        imgLinks.push(allLinks[i]);
      }
      return imgLinks;
    } else {
      allLinks = this.shuffle(allLinks);
      return allLinks;
    }
    
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
      if (e.year === year && e.month ===month && e.day===day) {
        diaries.push(JSON.parse(JSON.stringify(e)));
      }
    }
    return diaries;
  }

// Keep this as get by "key" so that it can be used not only for getting today's mood but also for searching
  public getMoodByKey(key: string): Mood {
    for (let e of this.moods) {
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

  private findMoodByKey(key: string): Mood {
    for (let e of this.moods) {
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

  // Create Quick Log
  public createQuickLog(camera) {
    let newDiary = new Diary();
    newDiary.key = "";
    newDiary.text = "Go ahead and complete this highlight!";
    newDiary.image = "";
    newDiary.hasimage = true;
    if (camera) {
      this.quciLogWithCam(newDiary);
    } else {
      this.quickLogFromAlbum(newDiary);
    };
  }

  // Add Mood
    public addMood(mood:Mood) {

    let today= new Date();
    mood.key = today.getFullYear()+"-"+(1+today.getMonth())+"-"+today.getDate();
    //save
    let listRef = this.db.ref('/Moods');
    let prefRef = listRef.child(mood.key);
    let dataRecord = {
      type: mood.type,
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      day: today.getDate().toString(),
    };
    prefRef.set(dataRecord);
    this.notifySubscribers();
    console.log("Added a mood, the list is now: ", this.moods);
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

  // update mood
  public updateMood(key: string, newMood: Mood): void {
    let moodToUpdate: Mood = this.findMoodByKey(key); 
    moodToUpdate.type = newMood.type;
    //save
    let parentRef = this.db.ref('/Moods');
    let childRef = parentRef.child(key);
    childRef.set({
      type: moodToUpdate.type, 
      year: moodToUpdate.year,
      month: moodToUpdate.month,
      day: moodToUpdate.day,
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

  // Quick Log Photo from Album
  private quickLogFromAlbum(diary: Diary) {
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
        this.addDiary(diary);
        this.presentConfirmation();   
      } else {
        diary.image = previous;
      }
     }, (err) => {
        diary.image = previous;
     });
  }

  // Quick Log Photo with Camera
  private quciLogWithCam(diary: Diary) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    let previous = diary.image;
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        diary.image = 'data:image/jpeg;base64,' + imageData;
        this.addDiary(diary);
        this.presentConfirmation();   
      } else {
        diary.image = previous;
      }
     }, (err) => {
        diary.image = previous;
     });
  }

  // Present Alert for Quick Log Confirmation
  private presentConfirmation() {
    let alert = this.alertCtrl.create({
      title: 'Photo is successfully logged!',
      subTitle: 'Remember to come back and complete it later today ;)',
      buttons: ['OK']
    });
    alert.present();
  }
  
  // Shuffle an Array
  private shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 != currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  
}
