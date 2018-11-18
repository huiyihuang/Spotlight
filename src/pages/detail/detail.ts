import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Diary } from '../../models/note';
import { HomePage } from '../home/home';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  private diary: Diary;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public dataService:DataServiceProvider) {
      let diaryKey = this.navParams.get("diaryKey");
      console.log("here key is ", diaryKey);
      if (diaryKey === undefined) {
      this.diary = new Diary();
      this.diary.key = ""; 
      this.diary.text = "";
      this.diary.image = "";
    } else {
      this.diary = this.dataService.getDiaryByKey(diaryKey);
    }
  }

  private saveDiary() {
    if (this.diary.key == "") { 
      this.dataService.addDiary(this.diary);
    } else {
      this.dataService.updateDiary(this.diary.key, this.diary);
    }
    this.navCtrl.pop();
    console.log(this.diary);
  }

  private backToHome() {
    this.navCtrl.push(HomePage);
  }

}
