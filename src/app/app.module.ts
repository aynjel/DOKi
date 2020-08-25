import { FormsModule } from "@angular/forms";

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { Ionic4DatepickerModule } from "@logisticinfotech/ionic4-datepicker";
//import { InpatientmodalPageModule } from "./components/inpatientmodal/inpatientmodal.module";
import { ChhAppInPatientModalPageModule } from "../app/chh-web-components/chh-app-in-patient-modal/chh-app-in-patient-modal.module";
import { ChhAppAddAppointmentsModalPageModule } from "../app/chh-web-components/chh-app-add-appointments-modal/chh-app-add-appointments-modal.module";

//import { SliderPageModule } from './components/slider/slider.module';
//import { defineCustomElements } from '@teamhive/lottie-player/loader';

//import {LottieAnimationViewModule } from 'ng-lottie';

//defineCustomElements(window);

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
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
    ChhAppInPatientModalPageModule,
    ChhAppAddAppointmentsModalPageModule,
    NgxGoogleAnalyticsModule.forRoot('UA-175566562-1'),
    NgxGoogleAnalyticsRouterModule,
    //LottieAnimationViewModule,
    //SliderPageModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
