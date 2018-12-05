import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Diary, Mood } from '../../models/note';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the TrendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trend',
  templateUrl: 'trend.html',
})
export class TrendPage {

  private moods: Mood[] = [];
  public lineChartLegend:boolean = false;
  public yaxis: number[] = [3, 2, 2, 3, 1];
  public xaxis: string[] = ["2018-11-28", "2018-11-29", "2018-11-30", "2018-12-2", "2018-12-3"];
  public doughnutChartLabels:string[] = ["28", '28', "29"];
  public doughnutChartData:number[] = [1,3,2];
  public doughnutChartType:string = 'line';
  public lineChartOptions:any = {
    responsive: true
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataServiceProvider) {
      this.dataService.getObservable().subscribe(update => {
        this.moods = dataService.getMoods();
      });
      this.moods = dataService.getMoods();
      this.moods.forEach(element => {
        if (element.type == "smile") {
          this.yaxis.push(3)
        } else if (element.type == "meh") {
          this.yaxis.push(2)
        } else {
          this.yaxis.push(1)
        };
        this.xaxis.push(element.key)
      });
    }

  showmoods() {
      console.log('xaxis', this.xaxis)
      console.log('yaxis', this.yaxis)
  }
    
}



