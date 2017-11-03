import { UserCenterPage } from './../user-center/user-center';
import { CountPage } from './../count/count';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CountPage;
  tab3Root = UserCenterPage;

  constructor() {
    
  }
}
