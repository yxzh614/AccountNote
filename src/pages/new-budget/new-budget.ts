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

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBudgetPage');
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
