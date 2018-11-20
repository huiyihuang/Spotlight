import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Diary, Mood } from '../../models/note';
import { DetailPage } from '../detail/detail';
import { AddTodayHighlightPage } from '../add-today-highlight/add-today-highlight';
import { CreateHighlightPage } from '../create-highlight/create-highlight';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private diaries: Diary[] = [];
  private moods: Mood[] = [];

  constructor(public navCtrl: NavController,
    private dataService:DataServiceProvider) {
      this.dataService.getObservable().subscribe(update => {
        this.diaries = dataService.getEntries();
      });
      this.diaries = dataService.getEntries();
    }

  private editDiary(diaryKey:string) {
    this.navCtrl.push(CreateHighlightPage, {"diaryKey": diaryKey});
  }

  private deleteDiary(diaryKey:string) {
    this.dataService.removeDiary(diaryKey);
  }

  private goToHighlightList() {
    this.navCtrl.push(AddTodayHighlightPage);
  }

}
