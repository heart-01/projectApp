import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular'; //popup message ธรมดา ต้องกด ok ถึงจะหาย

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  dataRoom:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: Toast,
  public http: Http, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    this.getData();
  }

  getData(){
    this.http.get('http://localhost:8080/showRoom')
    .map(res=>res.json())
    .subscribe(data=>{
      this.dataRoom=data;
    });
  }




}
