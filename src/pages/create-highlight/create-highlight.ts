import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Diary } from '../../models/note';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AddTodayHighlightPage } from '../add-today-highlight/add-today-highlight';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-create-highlight',
  templateUrl: 'create-highlight.html',
})
export class CreateHighlightPage {

  private diary: Diary;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dataService:DataServiceProvider, 
    private camera: Camera) {
      let diaryKey = this.navParams.get("diaryKey");
      console.log("Current key:", diaryKey);
      if (diaryKey === undefined) {
        this.diary = new Diary();
        this.diary.key = ""; 
        this.diary.text = "";
        this.diary.image = "";
      } else {
        this.diary = this.dataService.getDiaryByKey(diaryKey);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateHighlightPage');
  }

  private saveDiary() {
    //check if current diary has image
    if (this.diary.image === "") {
      this.diary.hasimage = false;
      console.log("Does not contain image.")
    } else {
      this.diary.hasimage = true;
      console.log("Contains image.")
    }

    //save diary
    if (this.diary.key == "") {
      this.dataService.addDiary(this.diary);
    } else {
      this.dataService.updateDiary(this.diary.key, this.diary);
    }
    this.navCtrl.pop();
    console.log(this.diary);
  }

  private goBack() {
    this.navCtrl.push(AddTodayHighlightPage);
  }

  private addPic() {
    this.dataService.addPhotoFromAlbum(this.diary);
  }
}
