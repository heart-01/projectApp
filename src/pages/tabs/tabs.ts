import { LoginPage } from './../login/login';
import { RegisterPage } from './../register/register';
import { AddPage } from './../add/add';
import { SearchPage } from './../search/search';
import { ListPage } from './../list/list';
import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  tab1Root = ListPage;
  tab2Root = SearchPage;
  tab3Root = AddPage;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.presentPrompt();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'กรุณาเข้าสู่ระบบ..',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'ล็อกอิน',
          handler: data => {

            let username = data.username;
            let password = data.password;
            
            if(username==""){
              this.nullAlert();
              return false;
            }else if(password==""){
              this.nullAlert();
              return false;
            }else if(username=="" && password==""){
              this.nullAlert();
              return false;
            }

            this.navCtrl.push(LoginPage,{username : username , password : password });
            
          }
        },
        {
          text: 'สมัครสมาชิก',
          handler: data => {
            this.navCtrl.push(RegisterPage);
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  nullAlert() {
    let alert = this.alertCtrl.create({
      title: 'กรอกข้อมูล',
      subTitle: 'กรุณากรอก username และ password ให้ถูกต้อง',
      buttons: ['ตกลง']
    });
    alert.present();
  }
  

}
