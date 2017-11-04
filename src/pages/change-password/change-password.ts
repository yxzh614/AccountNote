import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Http} from '@angular/http';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  opassword: string;
  npassword: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  changePassword() {
    this.http.post('http://localhost/accountNoteBackEnd/changePassword', {
      username: window.localStorage.username,
      old: this.opassword,
      new: this.npassword
    }).map(res => res.json())
    .subscribe(res => {
      if(res.state === true) {
        this.presentToast('修改成功！');
        this.navCtrl.pop();
      } else{
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
