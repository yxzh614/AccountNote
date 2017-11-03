import { Budget } from './../../models/Budget';
import { Http } from '@angular/http';
import { NewBudgetPage } from './../new-budget/new-budget';
import { SettingPage } from './../setting/setting';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {
  budgets: Budget[] = [];
  budgetsTotal: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.budgetsTotal = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
  }
  
  goSetting() {
    console.log('go setting');
    this.navCtrl.push(SettingPage);
  }

  newBudget() {
    console.log('go setting');
    this.navCtrl.push(NewBudgetPage);
  }
  ionViewDidEnter() {
    this.budgets = [];
    this.budgetsTotal = 0;
    this.http.post('http://localhost/accountNoteBackEnd/getBudgets', {
      username: window.localStorage.username,
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
    })
    .map(res => res.json())
    .subscribe(res => {
      for(let i = 0;i<res.length;i++) {
        console.log(res[i]);
        let topush = new Budget();
        topush.month = (new Date()).getMonth();
        topush.year = (new Date()).getFullYear();
        topush.type = res[i]['type'];
        topush.value = res[i]['value'];
        if(this.budgets) {
          this.budgets.push(res[i]);
          this.budgetsTotal += parseFloat(res[i]['money']);
        } else {
          this.budgets = [res[i]];
        }
      }
    })
  }
}
