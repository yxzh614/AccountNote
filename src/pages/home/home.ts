import { Http } from '@angular/http';
import { BillProvider } from './../../providers/bill/bill';
import { BillList } from './../../models/BillList';
import { Bill } from './../../models/Bill';
import { LoginPage } from './../login/login';
import { NewBillPage } from './../new-bill/new-bill';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  month: number = 0;
  billList:BillList[]=[];
  constructor(public navCtrl: NavController,public billService:BillProvider, public http: Http) {
    this.billList = billService.BillList;
    this.navCtrl.push(LoginPage,{},{animate: false});
    this.getNextDayBillList(this.month);
  }
  ionViewDidEnter() {
    console.log('enter home');
    this.month = 0;
    this.billList = [];
    this.getNextDayBillList(this.month);
  }
  getNextDayBillList(monthParse) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    console.log(month);
    month -= monthParse;
    while(month < 0) {
      month += 12;
      year--;
    }
    this.http.post('http://localhost/accountNoteBackEnd/getNextDayBillList',{
      year: year,
      month: month,
      username: window.localStorage.username
    })
    .map(res => res.json())
    .subscribe(res => {
      let result = new BillList();
      result.year = year;
      result.month = month;
      result.total = 0;
      for(let i = 0;i<res.length;i++) {
          result.total += parseFloat(res[i]['money']);
        console.log(res[i]);
        if(result.dayList){
        result.dayList.push(
          new Bill(res[i]['day'], res[i]['username'], res[i]['title'], res[i]['type'], res[i]['money'])
        )
        } else {
          result.dayList = [ new Bill(res[i]['day'], res[i]['username'], res[i]['title'], res[i]['type'], res[i]['money'])];
        }
      }
      if(this.billList) {
        this.billList.push(result);
      } else {
        this.billList = [result];
      }
    })
  }
  newBill() {
    this.navCtrl.push(NewBillPage);
  }
  newBillPullDown(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.newBill();
      refresher.complete();
    },500);
  }
  newBillPullUp(infiniteScroll) {
    this.getNextDayBillList(++this.month);
    infiniteScroll.complete();
  }
}
