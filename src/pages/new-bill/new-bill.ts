import { Http } from '@angular/http';
import { Budget } from './../../models/Budget';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the NewBillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-bill',
  templateUrl: 'new-bill.html',
})
export class NewBillPage {
  budgets: Budget[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, public http: Http) {
  }

  ionViewDidEnter() {
    this.http.post('http://localhost/accountNote/getBudgets', {
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth(),
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
        } else {
          this.budgets = [res[i]];
        }
      }
    })
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: '保存成功',
      duration: 1500,
      position: 'top'
    });
    toast.present();
    this.navCtrl.pop();
  }
}
