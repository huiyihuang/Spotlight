import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Diary, Mood } from '../../models/note';
import { DetailPage } from '../detail/detail';
import { AddTodayHighlightPage } from '../add-today-highlight/add-today-highlight';
import { CreateHighlightPage } from '../create-highlight/create-highlight';
import { MoodPage } from '../../pages/mood/mood';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private diaries: Diary[] = [];
  private moods: Mood[] = [];

  constructor(public navCtrl: NavController,
    private dataService: DataServiceProvider, 
    private actionSheetCtrl: ActionSheetController) {
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

  private goToMoodPage() {
    this.navCtrl.push(MoodPage);
  }

  private presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add a photo to mark your highlight!',
      buttons: [
        {
          text: 'From Camera',
          handler: () => {
            console.log('<From Camera> clicked');
            let camera = true;
            this.dataService.createQuickLog(camera);
          }
        },
        {
          text: 'From Album',
          handler: () => {
            console.log('<From Album> clicked');
            let camera = false;
            this.dataService.createQuickLog(camera);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('<Cancel> clicked');
          }
        }
      ]
    });

    actionSheet.present();
 }

}
