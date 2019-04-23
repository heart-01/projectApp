import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  formRegister: FormGroup; //กำหนดตัวแปร formRegister มีค่าเป็น FormGroup เพื่อรับค่าจากฟอร์ม

  idStuCtrl: AbstractControl; //กำหนดตัวแปร idStu มีค่าเป็น AbstractControl คือ เป็นชื่อเรียกในการควบคุม
  nameStuCtrl: AbstractControl;
  emailStuCtrl: AbstractControl;
  telStuCtrl: AbstractControl;
  usernameCtrl: AbstractControl;
  passwordCtrl: AbstractControl;
  passwordConfirmCtrl: AbstractControl;

  password:any;
  passwordCon:any;

  student:any;
  data:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private alertCtrl: AlertController,
    private http: HttpClient) {

    this.formRegister = this.formBuilder.group({ // formBuilder คือ กำหนดกฎใน form group นี้
      idStu: ['', Validators.required], // ''คือเมื่อเปิดหน้านี้ให้เป็นค่าว่างก่อน , Validators คือการกำหนดค่า required คือห้ามเป็นค่าว่าง
      nameStu: ['', Validators.required],
      emailStu: ['', Validators.required],
      telStu: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
    
    this.idStuCtrl=this.formRegister.controls['idStu'];   //เก็บการคืนค่าของ formRegister idStu ในตัวแปร idStuCtrl ว่าไม่ได้ทำตามกฎ Validators อันไหนบ้าง  เพื่อใช้ในการเช็ค IF
    this.nameStuCtrl=this.formRegister.controls['nameStu'];
    this.emailStuCtrl=this.formRegister.controls['emailStu'];
    this.telStuCtrl=this.formRegister.controls['telStu'];
    this.usernameCtrl=this.formRegister.controls['username'];
    this.passwordCtrl=this.formRegister.controls['password'];
    this.passwordConfirmCtrl=this.formRegister.controls['passwordConfirm'];

  }

  addData(){
    console.log(this.formRegister.value);
    this.student  = this.formRegister.value;
    let url= "http://localhost:8080/addStudent";  //กำหนด url ที่ใช้ api
    this.http.post(url,this.student) //เรียกใช้ http api post ที่ url ตัวที่ 2 เป็น body เป็น ข้อมูลที่ต้องการประมวลผล
      .subscribe( //subscribe เมื่อประมวลผล api เสร็จแล้วทำงาน
        res=>{ //ให้ทำงานอะไรใส่เครื่องหมายของฟังชั่นเข้าไป res คือ api คืนค่าอะไรมาเราจะได้มาเช็คว่าถูกต้องหรือไม่
          this.data = res; //กำหนดให้ตัวแปรให้ data เก็บข้อมูลของ res

          if(this.data=="repeat idStu"){
            this.showAlert("ไม่สามารถเพิ่มข้อมูลได้","รหัสนักศึกษานี้มีอยู่แล้ว"); //แสดง alert
            return false;
          }else if(this.data=="repeat username"){
            this.showAlert("ไม่สามารถเพิ่มข้อมูลได้","Username นี้มีอยู่แล้ว"); //แสดง alert
            return false;
          }else if(this.data.msg==true){ //เช็คข้อมูลว่า msg ที่ api ส่งเข้ามาให้เป็นข้อมูลอะไร ในที่นี้ได้กำหนดว่า true
            this.showAlert("สำเร็จ","เพิ่มข้อมูลสมาชิกแล้ว"); //แสดง alert
            this.navCtrl.popToRoot();
          }else{ //ถ้า เพิ่มข้อมูลไม่ได้
            this.showAlert("ไม่สามารถเพิ่มข้อมูลได้","Error SQL ADD"); //แสดง alert
            return false;
          }

        }
      );
  }

  showAlert(msgTitle:string, message:string){ //method แสดง Alert อาจจะใช้สำหรับ กดตกลง หรือ ใช่ไม่ใช่
    const alert = this.alertCtrl.create({ //ได้กำหนดค่า alert ขึ้นมา 1 ตัว
      title: msgTitle, //กำหนด title บนหัวให้เป็นข้อมูล msgTitle
      subTitle: message, //กำหนด subTitle ข้อมูลใน title
      buttons: ["ตกลง"]  // ปุ่มใน alert
    });
    alert.present(); //แสดง alert
  }



  doSignup() {
    console.log(this.formRegister.value); //แสดงค่าทั้งหมดใน formRegister หลังจากการกด submit
    console.log(this.formRegister.value.username); //แสดงค่าใน formRegister ค่า username หลังจากการกด submit
    console.log(this.formRegister.valid); //เช็คว่าค่าทั้งหมดใน formRegister นั้นได้ทำตามกฎ formBuilder ไหม ถ้าทำตามจะคืนค่า ture 
  }


}
