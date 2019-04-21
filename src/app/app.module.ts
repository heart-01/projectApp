import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPage } from './../pages/add/add';
import { SearchPage } from './../pages/search/search';
import { ListPage } from './../pages/list/list';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http'; // เรียกใช้ HttpModule สำหรับ get ค่าจาก Http
import { HttpClientModule } from '@angular/common/http'; // import เพื่อใช้งาน Http บนเครื่อง Client
import { IonicStorageModule } from '@ionic/storage'; // import local storage
import { Toast } from '@ionic-native/toast'; // import alert toast

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ListPage,
    SearchPage,
    AddPage,
    RegisterPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ListPage,
    SearchPage,
    AddPage,
    RegisterPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Toast
  ]
})
export class AppModule {}
