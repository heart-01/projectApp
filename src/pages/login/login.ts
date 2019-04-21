import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: any;
  password: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('username');
    this.password = this.navParams.get('password');
    // this.checkValue();
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
