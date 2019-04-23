import { LoginPage } from './../login/login';
import { AddPage } from './../add/add';
import { SearchPage } from './../search/search';
import { ListPage } from './../list/list';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = ListPage;
  tab2Root = SearchPage;
  tab3Root = AddPage;

  constructor(public navCtrl: NavController) {
   
  }
  
  ionViewDidLoad(){
    this.navCtrl.push(LoginPage);
  }

}
