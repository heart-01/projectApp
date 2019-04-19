import { AddPage } from './../add/add';
import { SearchPage } from './../search/search';
import { ListPage } from './../list/list';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = SearchPage;
  tab3Root = AddPage;

  constructor() {

  }
}
