import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Diary } from '../../models/note';
import { HomePage } from '../home/home';
import { JournalPage } from '../journal/journal';
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


  private backToJournal() {
    this.navCtrl.push(JournalPage);
  }

}
