
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountPage } from './count';

import {ChartModule} from "angular2-highcharts";
@NgModule({
  declarations: [
    CountPage
  ],
  imports: [
    IonicPageModule.forChild(CountPage),ChartModule
  ],
})
export class CountPageModule {}
