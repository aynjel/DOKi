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


import { ChhAppChangePassPageModule } from "../app/chh-web-components/chh-app-change-pass/chh-app-change-pass.module";
import { ChhAppChangePasswordPageModule } from "../app/chh-web-components/chh-app-change-password/chh-app-change-password.module";



import { ChhAppPrivacyPolicyPageModule } from "./chh-web-components/chh-app-privacy-policy/chh-app-privacy-policy.module"
import { ChhAppTermsAndConditionsPageModule } from "./chh-web-components/chh-app-terms-and-conditions/chh-app-terms-and-conditions.module"
import {ChemistryPageModule} from "./chh-web-components/chh-app-test/chh-app-chemistry/chemistry.module";

import {ChhAppBasePageModule} from "./chh-web-components/chh-app-test/chh-app-base/chh-app-base.module";

import { ChhAppTestChemistryComponent } from "./chh-web-components/chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component";
import { ChhAppTestFecalysisComponent } from "./chh-web-components/chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component";
import { ChhAppTestSerologyComponent } from "./chh-web-components/chh-app-test/chh-app-test-serology/chh-app-test-serology.component";
//import { SliderPageModule } from './components/slider/slider.module';
//import { defineCustomElements } from '@teamhive/lottie-player/loader';

//import {LottieAnimationViewModule } from 'ng-lottie';

//defineCustomElements(window);

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { Constants } from "../app/shared/constants";
import { Variables } from "../app/shared/variables";
import { Messages } from "../app/shared/messages";
import { UserIdleModule } from 'angular-user-idle';
import {  HTTP_INTERCEPTORS } from "@angular/common/http";
import {AuthInterceptor} from "./services/auth/auth.interceptor";
  import { from } from "rxjs";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [ChhAppTestChemistryComponent,ChhAppTestFecalysisComponent,ChhAppTestSerologyComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    Ionic4DatepickerModule,
    ChhAppInPatientModalPageModule,
    ChhAppAddAppointmentsModalPageModule,
    ChhAppPrivacyPolicyPageModule,
    ChemistryPageModule,
    ChhAppBasePageModule,
    ChhAppTermsAndConditionsPageModule,
    ChhAppChangePasswordPageModule,
    ChhAppChangePassPageModule,
    NgxGoogleAnalyticsModule.forRoot('UA-175566562-1'),
    NgxGoogleAnalyticsRouterModule,
    //LottieAnimationViewModule,
    //SliderPageModule,
    UserIdleModule.forRoot({idle:10, timeout: 10, ping: 20}),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  providers: [
    Messages,
    Variables,
    Constants,
    StatusBar,
    SplashScreen,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide : HTTP_INTERCEPTORS, useClass :AuthInterceptor, multi:true}

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
