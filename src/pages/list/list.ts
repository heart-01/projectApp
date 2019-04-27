import { LogoutComponent } from './../../components/logout/logout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular'; //popup message ธรมดา ต้องกด ok ถึงจะหาย
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  dataRoom:any[];
  idStu:any=""; //สร้างตัวแปรเพื่อรับค่า idStu ที่ส่งมาจาก localStorage
  idStatus:any=""; //สร้างตัวแปรเพื่อรับค่า idStatus ที่ส่งมาจาก localStorage
  nameStu:any="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: Toast,
  public http: Http, public localStorage: Storage, private alertCtrl: AlertController) {

    this.localStorage.ready().then(()=>{ //เรียกใช้ข้อมูลแบบ localStorage เหมือน session แล้วให้ทำงาน
      this.localStorage.get('idStu').then((val)=>{this.idStu=val;}); //แสดงข้อมูล local idStu แล้วเก็บไว้ที่ val พอข้อมูลอยู่ที่ val แล้วส่งให้ตัวแปรภายนอก idStu อีกที
      this.localStorage.get('idStatus').then((val)=>{this.idStatus=val;});
      this.localStorage.get('nameStu').then((val)=>{this.nameStu=val;});
    });
    
  }

  ionViewDidLoad(){ //event เมื่อหน้านี้โหลดครั้งแรก
    
  }

  ionViewDidEnter(){ //eventทุกครั้งที่เรียกหน้านี้ให้ทำงาน
    this.getData();
    console.log(this.idStu);
  }

  getData(){
    this.http.get('http://localhost:8080/showRoom')
    .map(res=>res.json())
    .subscribe(data=>{
      this.dataRoom=data;
    });
  }

  Alert(msgTitle:string, message:string){ //method แสดง Alert อาจจะใช้สำหรับ กดตกลง หรือ ใช่ไม่ใช่
    const alert = this.alertCtrl.create({ //ได้กำหนดค่า alert ขึ้นมา 1 ตัว
      title: msgTitle, //กำหนด title บนหัวให้เป็นข้อมูล msgTitle
      subTitle: message, //กำหนด subTitle ข้อมูลใน title
      buttons: [
                {
                  text:'ตกลง'
                }
              ]
    });
    alert.present(); //แสดง alert
  }





}
