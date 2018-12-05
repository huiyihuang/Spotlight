import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { DetailPage } from '../pages/detail/detail';
import { AddTodayHighlightPage } from '../pages/add-today-highlight/add-today-highlight';
import { CreateHighlightPage } from '../pages/create-highlight/create-highlight';
import { MoodPage } from '../pages/mood/mood';
import { TabsPage } from '../pages/tabs/tabs';
import { CompletePage } from '../pages/complete/complete';

import { JournalPage } from '../pages/journal/journal';
import { Camera } from '@ionic-native/camera';
import { TrendPage } from '../pages/trend/trend';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    AddTodayHighlightPage,
    CreateHighlightPage,
    MoodPage,
    TabsPage,
    JournalPage,
    CompletePage,
    TrendPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    AddTodayHighlightPage,
    CreateHighlightPage,
    MoodPage,
    TabsPage,
    JournalPage,
    CompletePage,
    TrendPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    Camera
  ]
})
export class AppModule {}
