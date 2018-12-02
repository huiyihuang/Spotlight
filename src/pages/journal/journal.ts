import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Diary, Mood } from '../../models/note';
import { DetailPage } from '../detail/detail';
import { AddTodayHighlightPage } from '../add-today-highlight/add-today-highlight';
import { CreateHighlightPage } from '../create-highlight/create-highlight';
import { MoodPage } from '../../pages/mood/mood';
/**
 * Generated class for the JournalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html',
})
export class JournalPage {
  private diaries: Diary[] = [];
  private moods: Mood[] = [];

  constructor(public navCtrl: NavController,
    private dataService: DataServiceProvider, ) {
      this.dataService.getObservable().subscribe(update => {
        this.diaries = dataService.getEntries();
      });
      this.diaries = dataService.getEntries();
    }

  private goToDetail(diaryKey:string) {
    this.navCtrl.push(DetailPage, {"diaryKey": diaryKey});
  }

  // private deleteDiary(diaryKey:string) {
  //   this.dataService.removeDiary(diaryKey);
  // }



}
