import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBudgetPage } from './new-budget';

@NgModule({
  declarations: [
    NewBudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBudgetPage),
  ],
})
export class NewBudgetPageModule {}
