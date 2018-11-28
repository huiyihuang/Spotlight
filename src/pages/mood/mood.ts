import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Diary, Mood } from '../../models/note';
import { DetailPage } from '../detail/detail';
import { HomePage } from '../home/home';
import { AddTodayHighlightPage } from '../add-today-highlight/add-today-highlight';
import { CreateHighlightPage } from '../create-highlight/create-highlight';

/**
 * Generated class for the MoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mood',
  templateUrl: 'mood.html',
})
export class MoodPage {

	private mood:Mood;
	private moods:Mood[];
	private moodKey:string="";
	private load:boolean=false;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private dataService:DataServiceProvider) {

    this.dataService.getObservable().subscribe(update => {

	    this.moods = dataService.getMoods();
      console.log("get moods in observerable update:",this.moods);

	// find today's date in the keys of old moods
	    var time = new Date();
	    var today = time.getFullYear()+"-"+(1+time.getMonth())+"-"+time.getDate();
	    for (let i=0;i<this.moods.length;i++){
	    	if(this.moods[i].key===today){
	    		this.moodKey=today;
	    	};

	// if today's date is not found in old moods, set the mood as an empty new mood, else set this.mood as the mood that matches today
	    if (this.moodKey === "") {
	      this.mood = new Mood();
	      this.mood.type = "";
	      this.mood.key = ""; 
	    } else {
	      this.mood = this.dataService.getMoodByKey(this.moodKey);
	    		};
      if(dataService.loadData=true){
        this.load=true;
        };
      console.log("this.load:",this.load);

    };});

    this.moods = dataService.getMoods();
    console.log("get moods in constructor:",this.moods);

    var time = new Date();
    var today = time.getFullYear()+"-"+(1+time.getMonth())+"-"+time.getDate();

    for (let i=0;i<this.moods.length;i++){
    	if(this.moods[i].key===today){
    		this.moodKey=today;
    	}
    };

    if (this.moodKey === "") {
      this.mood = new Mood();
      this.mood.type = "";
      this.mood.key = ""; 
    } else {
      this.mood = this.dataService.getMoodByKey(this.moodKey);
    };

    if(dataService.loadData===true){
      this.load=true;};
    console.log("this.load:",this.load);

  }




private goToHome() {
    this.navCtrl.push(HomePage);
    }

private saveMood(type:string) {

	// console.log(this.moods.indexOf(this.mood));

	  if ( this.moods.indexOf(this.mood)=== -1) { 
	  this.mood.type = type;
      this.dataService.addMood(this.mood);
    } else {
      this.dataService.updateMood(this.mood.key, this.mood);
    }
    this.navCtrl.push(AddTodayHighlightPage);

}


private goToHighlightList() {
    this.navCtrl.push(AddTodayHighlightPage);
  }


}
