import { LoginPage } from './../login/login';
import { ChangePasswordPage } from './../change-password/change-password';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  toChangePassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
  logout() {
    window.localStorage.username = '';
    window.localStorage.password = '';
    this.navCtrl.popToRoot();
    this.navCtrl.push(LoginPage);
  }
}
