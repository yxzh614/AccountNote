import { Bill } from './../../models/Bill';
import { Http } from '@angular/http';
import { Budget } from './../../models/Budget';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

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
  bInfo: string;
  type: string;
  bMoney: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, public http: Http, public alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.http.post('http://localhost/accountNoteBackEnd/getBudgets', {
      username: window.localStorage.username,
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
    })
    .map(res => res.json())
    .subscribe(res => {
      if(res) {
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
      } else {
        console.log(res);
          let alert = this.alertCtrl.create({
            title: '请先设置个人预算！',
            subTitle: '',
            buttons: ['OK']
          });
          alert.present();
        this.navCtrl.pop();
      }
    })
  }
  save() {
    let date =new Date();
    let btopush = {
      username: window.localStorage.username,
      title: this.bInfo,
      type: this.type,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      money: this.bMoney
    }
    this.http.post('http://localhost/accountNoteBackEnd/newBill', btopush)
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
      if (res.state === true) {
        this.presentToast('保存成功');
        this.navCtrl.pop();
      } else {  
        this.presentToast(res.error);
      }
    })
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
}
