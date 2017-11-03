import { BillList } from './../../models/BillList';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BillProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BillProvider {
  BillList: BillList[];
  constructor(public http: Http) {
  }
  public test() {
    this.http.get('http://localhost/accountNote/get')
    .map(res => res.json())
    .subscribe(str => console.log(str))
  }
}
