import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
import {InpatientmodalPageModule} from './components/inpatientmodal/inpatientmodal.module';
import {AddappointmentsmodalPageModule} from './components/addappointmentsmodal/addappointmentsmodal.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    FormsModule,  
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    Ionic4DatepickerModule,
    InpatientmodalPageModule,
    AddappointmentsmodalPageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production },)],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
