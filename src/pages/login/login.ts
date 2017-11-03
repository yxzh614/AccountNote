import { Http, Headers } from '@angular/http';
import { Account } from './../../models/Account';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginAccount: Account;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: Http) {
    this.loginAccount = {
      username: 'admin',
      password: '123123'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');    
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }   
  }
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'flex';
        });
    }
}  
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  login() {
    this.http.post('http://localhost/accountNote/login.php', JSON.stringify({
      username: this.loginAccount.username,
      password: this.loginAccount.password
    }))
    .map(res => res.json())
    .subscribe(res => {
      console.log(res);
      if (res.state === true) {
        this.presentToast('登录成功');
        this.navCtrl.pop({animate: false});
      } else {  
        this.presentToast(res.error);
      }
    })
  }
  signup() {
    this.presentToast('注册成功');
    this.navCtrl.pop();
  }
}
