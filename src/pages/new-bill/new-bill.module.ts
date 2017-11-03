import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBillPage } from './new-bill';

@NgModule({
  declarations: [
    NewBillPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBillPage),
  ],
})
export class NewBillPageModule {}
