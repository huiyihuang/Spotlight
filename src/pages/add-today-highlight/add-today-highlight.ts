import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Diary, Mood } from '../../models/note';
import { CreateHighlightPage } from '../create-highlight/create-highlight';

@IonicPage()
@Component({
  selector: 'page-add-today-highlight',
  templateUrl: 'add-today-highlight.html',
})
export class AddTodayHighlightPage {

  private diaries: Diary[] = [];
  private goalComplete: Boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private dataService:DataServiceProvider) {
      this.dataService.getObservable().subscribe(update => {
        this.diaries = dataService.getDiaryByDate();
        if (this.diaries.length >= 3) {
          this.goalComplete = true;
        } else {
          this.goalComplete = false;
        }
      });
      this.diaries = dataService.getDiaryByDate();
      if (this.diaries.length >= 3) {
        this.goalComplete = true;
      } else {
        this.goalComplete = false;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTodayHighlightPage');
  }

  private addDiary() {
    this.navCtrl.push(CreateHighlightPage);
  }

  private editDiary(diaryKey:string) {
    this.navCtrl.push(CreateHighlightPage, {"diaryKey": diaryKey});
  }

  private deleteDiary(diaryKey:string) {
    this.dataService.removeDiary(diaryKey);
  }

  private goToCreatePage() {
    this.navCtrl.push(CreateHighlightPage);
  }

  private complete() {

  }

}
