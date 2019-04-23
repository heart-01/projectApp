import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { RegisterPage } from './../register/register';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // idStu:any; //สร้างตัวแปรเพื่อรับค่า idStu ที่ส่งมาจาก localStorage
  // idStatus:any; //สร้างตัวแปรเพื่อรับค่า idStatus ที่ส่งมาจาก localStorage
  // nameStu:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: Storage, 
  public http: Http, private alertCtrl: AlertController) {

    // this.checkValue();
  }

  ionViewDidEnter(){ //eventทุกครั้งที่เรียกหน้านี้ให้ทำงาน
    this.presentPrompt();  //เรียกใช้งาน method presentPrompt
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
            
            if(username=="" && password==""){
              this.nullAlert("กรอกข้อมูล Username และ Password");
              return false;
            }else if(username==""){
              this.nullAlert("กรอกข้อมูล Username");
              return false;
            }else if(password==""){
              this.nullAlert("กรอกข้อมูล Password");
              return false;
            }

            this.sendLogin(username,password); //ส่งข้อมูล username กับ password ที่กรอกเข้าไปที่ method sendLogin
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
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    alert.present();
  }

  nullAlert(msgTitle:string) {
    let alert = this.alertCtrl.create({
      title: msgTitle,
      buttons: ['ตกลง']
    });
    alert.present();
  }




  sendLogin(user,pass){ //method ส่งค่า Login รับพารามิเตอร์ user กับ pass
    let username = user; // ประกาศตัวแปรใน method ให้มีค่าเท่ากับพารามิเตอร์ user
    let password = pass;
    let url="http://localhost:8080/login/"+[username,password]; //ประกาศตัวแปร url ให้มีค่าเป็น Url API ที่เราสร้างไว้
    this.http.get(url) //เรียกใช้ http เพื่อส่ง url ให้ api
    .map(res=>res.json()) //เรียกใช้ .map เพื่อทำให้ข้อมูลที่เรียกใช้เป็น json
    .subscribe(data=>{ // subscribe หลังจากนั้นให้ทำงาน ข้อมูลที่ได้จาก API จะอยู่ในตัวแปร data
      if(data=="Register"){
        this.showAlert("ไม่พบข้อมูลผู้ใช้","กรุณาตรวจสอบ Username หรือ Password <br>หากยังไม่มีสมาชิกกรุณาสมัครสมาชิก"); //แสดง alert
      }else{
        this.localStorage.ready().then(()=>{ //เรียกใช้ข้อมูลแบบ localStorage เหมือน session แล้วให้ทำงาน
          this.localStorage.set('idStu',data.idStu); //set ข้อมูล localStorage ให้อยู่ในตัวแปรชื่อ idStu แล้วเก็บข้อมูล data.idStu
          this.localStorage.set('idStatus',data.idStatus);
          this.localStorage.set('nameStu',data.nameStu);
        });
        this.Alert("ยินดีต้อนรับ",data.nameStu);
        this.navCtrl.popTo(ListPage);
        // this.getLocal(); //เรียกใช้ method getLocal
        // console.log(this.nameStu);
      }

    });
  }

  // getLocal(){ //method แสดงข้อมูล Local
  //   this.localStorage.ready().then(()=>{ //เรียกใช้ข้อมูลแบบ localStorage เหมือน session แล้วให้ทำงาน
  //     this.localStorage.get('idStu').then((val)=>{this.idStu=val;}); //แสดงข้อมูล local idStu แล้วเก็บไว้ที่ val พอข้อมูลอยู่ที่ val แล้วส่งให้ตัวแปรภายนอก idStu อีกที
  //     this.localStorage.get('idStatus').then((val)=>{this.idStatus=val;});
  //     this.localStorage.get('nameStu').then((val)=>{this.nameStu=val;});
  //   });
  // }

  showAlert(msgTitle:string, message:string){ //method แสดง Alert อาจจะใช้สำหรับ กดตกลง หรือ ใช่ไม่ใช่
    const alert = this.alertCtrl.create({ //ได้กำหนดค่า alert ขึ้นมา 1 ตัว
      title: msgTitle, //กำหนด title บนหัวให้เป็นข้อมูล msgTitle
      subTitle: message, //กำหนด subTitle ข้อมูลใน title
      buttons: [
                {
                  text:'ตกลง',
                  role: 'ok',
                  handler: data => {
                    this.presentPrompt();
                  }
                },
                {
                  text: 'สมัครสมาชิก',
                  role: 'Register',
                  handler: data => {
                    this.navCtrl.push(RegisterPage);
                  }
                }
               ]  // ปุ่มใน alert
    });
    alert.present(); //แสดง alert
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



  

  // checkValue() {
  //   var textA = '123';
  //   var textB = 'IlikeAPPles';
  //   var regexOne = /^[A-Za-z0-9]$/

  //   // Output : false
  //   console.log(regexOne.test(textA));

  //   // Output : true
  //   console.log(regexOne.test(textB));
  // }


}
