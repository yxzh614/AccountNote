import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the NewBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-budget',
  templateUrl: 'new-budget.html',
})
export class NewBudgetPage {
  bgMoney: string;
  bgType: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, public http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBudgetPage');
  }

  save() {
    console.log('save budget');
    this.http.post('http://localhost/accountNoteBackEnd/newBudget', {
      username: window.localStorage.username,
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      type: this.bgType,
      money: this.bgMoney
    }).map(res => res.json())
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
