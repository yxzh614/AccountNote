import { LoginPage } from './../pages/login/login';
import { ChangePasswordPage } from './../pages/change-password/change-password';
import { NewBillPage } from './../pages/new-bill/new-bill';
import { NewBudgetPage } from './../pages/new-budget/new-budget';
import { SettingPage } from './../pages/setting/setting';
import { UserCenterPage } from './../pages/user-center/user-center';
import { CountPage } from './../pages/count/count';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import {ChartModule} from "angular2-highcharts";
// import { HighchartsStatic } from '../../node_modules/._angular2-highcharts@0.5.5@angular2-highcharts/dist/HighchartsService';
import { BillProvider } from '../providers/bill/bill';
import { HttpModule } from '@angular/http';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,CountPage,UserCenterPage,SettingPage,NewBudgetPage,NewBillPage,ChangePasswordPage,LoginPage
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,CountPage,UserCenterPage,SettingPage,NewBudgetPage,NewBillPage,ChangePasswordPage,LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BillProvider
  ]
})
export class AppModule {}
