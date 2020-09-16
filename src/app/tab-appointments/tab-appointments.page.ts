import { Component, OnInit } from "@angular/core";
import { PatientService } from "../services/patient/patient.service";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth/auth.service";
import { DoctorService } from "../services/doctor/doctor.service";
import { HostListener } from "@angular/core";
import { ChhAppPatientDetailsPage } from "../chh-web-components/chh-app-patient-details/chh-app-patient-details.page";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { ActionSheetController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { FunctionsService } from "../shared/functions/functions.service";
import { ChhAppAddAppointmentsModalPage } from "../chh-web-components/chh-app-add-appointments-modal/chh-app-add-appointments-modal.page";
import { ToastService } from "../services/toast/toast.service";
import { LoadingController } from "@ionic/angular";
import { LoginData } from "../models/login-data.model";
import { GoogleAnalyticsService } from "ngx-google-analytics";

import {  AfterViewInit, ElementRef, Renderer2, Input, NgZone } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { ViewChildren, QueryList } from "@angular/core";
import {  IonGrid, IonContent,IonRow } from "@ionic/angular";
import { Constants } from "../shared/constants";
import { Messages } from "../shared/messages";

@Component({
  selector: "app-tab-appointments",
  templateUrl: "tab-appointments.page.html",
  styleUrls: ["tab-appointments.page.scss"],
})

export class TabAppointmentsPage {
  isDesktop: boolean;
  displaydata = this.constants.CHH_SITE__VALUE__CEBU.toLowerCase(); //"chhc";
  segment = this.constants.CHH_SITE__VALUE__CEBU.toLowerCase(); //"chhc";
  sidesegment = "today";
  selectedDate: any;
  selectedLocation: any;
  jsonObj5 = [];
  objecthandler: boolean = false;
  isFetchDone: boolean = false;
  customPickerOptions: any;
  isDisabled: boolean = false;
  public items: string[] = [];
  buttonDisablerHospSelector: boolean = false;
  buttonDisablerDateSelector: boolean = false;
  hospitalActivator: any;
  dr_code = "";
  public logindata: LoginData;
  yAxisArray;
  ishidden:boolean = true;
  headerData;
  constructor(
    private patientService: PatientService,
    private modalController: ModalController,
    private authService: AuthService,
    private doctorService: DoctorService,
    private screensizeService: ScreenSizeService,
    private popover: PopoverController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    public functionsService: FunctionsService,
    private toast: ToastService,
    public loadingController: LoadingController,
    protected $gaService: GoogleAnalyticsService,
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2,
    private zone:NgZone,
    public constants: Constants,
    public messages: Messages
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    this.headerData = this.functionsService.getSystemDate();
  }

  @ViewChildren(IonGrid, {read: ElementRef}) yAxis:QueryList<ElementRef>
  async ngAfterViewInit() {
    this.yAxisArray = this.yAxis.toArray();
      const options1: GestureConfig = {
      el: document.querySelector('#headerx'),
      direction:  'x',
      gestureName: 'slide-drawer-swipe',
      onMove: (ev) => {
        this.yAxisArray[1].nativeElement.style.transform = '.5s ease-in';
        this.setCard(ev.deltaX,this.yAxisArray[1].nativeElement);
        if(ev.deltaX > 120){
          this.yAxisArray[1].nativeElement.style.transform =  `translateX(${500}px)`;
        }else if (ev.deltaX < -120){
          this.yAxisArray[1].nativeElement.style.transform = `translateX(${-500}px)`;
        }else{
          this.zone.run(() =>{this.ishidden=false;})
          this.yAxisArray[1].nativeElement.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 90}deg)`;
        }
       },onEnd: ev =>{
        this.yAxisArray[1].nativeElement.style.opacity = 1;
        this.yAxisArray[1].nativeElement.style.transform = '.5s ease-out';
        if(ev.deltaX > 120){
            this.zone.run(() =>{
              this.headerData = this.selectedDate = this.functionsService.incrementDate(this.selectedDate, -1);
              this.dateChanged(this.selectedDate);
              this.zone.run(() =>{this.ishidden=true;})
              this.yAxisArray[1].nativeElement.style.transform = '';
            })
          }else if (ev.deltaX < -120){
            this.zone.run(() =>{
            this.headerData = this.selectedDate = this.functionsService.incrementDate(this.selectedDate, 1);
            this.dateChanged(this.selectedDate);
            this.yAxisArray[1].nativeElement.style.transform = '';
            this.zone.run(() =>{this.ishidden=true;})
          })
          }else{
            this.zone.run(() =>{this.ishidden=true;})
            this.yAxisArray[1].nativeElement.style.transform = '';
          }
       }
    };
   const options2: GestureConfig = {
      el: document.querySelector('#headery'),
      direction:  'y',
      gestureName: 'slide-drawer-swipeer',
      onMove: (ev) => {
      if(ev.deltaY >= 150){
        this.zone.run(() =>{this.ishidden=false;})
        this.yAxisArray[1].nativeElement.style.transform = '1s transition-delay';
        this.yAxisArray[1].nativeElement.style.transform = `translateY(${150}px)`;
      }
       },onEnd: (ev) =>{

       this.yAxisArray[1].nativeElement.style.transform = '.5s ease-out';
        if(ev.deltaY >= 150){
          this.zone.run(() =>{
            this.doRefresh1(event); 
          })
          setTimeout(()=>{

            this.callback();
       
          },1000); 
        }else{
          this.yAxisArray[1].nativeElement.style.transform = '';
        }

       }
     
    };
    if(!this.isDesktop){
      const gesture1 = await this.gestureCtrl.create(options1);
      const gesture2 = await this.gestureCtrl.create(options2);
      gesture1.enable();
      gesture2.enable();
    }

  }
  setCard(x, element){
    x = x /1.5;
    this.functionsService.logToConsole('x ->' + x);
    if(!(x > 0)){x = x * -1;}
     this.functionsService.logToConsole('x ->' + (1 - (x/100)));
    element.style.opacity = 1 - (x/100);
  }
  callback(){
    this.yAxisArray[1].nativeElement.style.transform = '';
    this.zone.run(() =>{
      this.ishidden=true;
    })
    
  }
  doRefresh1(event) {
    setTimeout(() => {
      this.getDate(this.selectedDate, this.selectedLocation);

    }, 1000);
  }
  /* async Alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  } */

  //present View & Delete
  async presentActionSheet(data1: any, data2: any, data3: any) {
    if (data2 == this.constants.APPOINTMENT_STATUS__VALUE__RESERVED/*"Reserved"*/) {
      const actionSheet = await this.actionSheetController.create({
        cssClass: "my-custom-class",
        buttons: [
          {
            text:this.constants.UI_COMPONENT_TEXT__VALUE__DELETE,
            role: "destructive",
            icon: "trash",
            handler: () => {
              this.presentAlertConfirm(data3, data1);
            },
          },
          { text: this.constants.UI_COMPONENT_TEXT__VALUE__CANCEL, icon: "close", role: "cancel" },
        ],
      });
      await actionSheet.present();
    }
  }

  //Affirm Delete
  async presentAlertConfirm(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message:
        this.messages.CONFIRMATION_DELETE_RECORD + "<strong>" +
        data1 +
        "</strong>'s appointment?",
      buttons: [
        { text: this.constants.UI_COMPONENT_TEXT__VALUE__CANCEL, role: "cancel", cssClass: "secondary" },
        {
          text: "Sure",
          handler: () => {
            this.patientService.deletePatients(data2).subscribe((res: any) => {
              if (res == "UPDATED") {
                //this.toast.presentToast('Successfully Deleted '+data1);
                this.functionsService.alert(this.messages.SUCCESS_DELETING_RECORD + data1, this.constants.UI_COMPONENT_TEXT__VALUE__OKAY);
              } else {
                //this.toast.presentToast('Error on Deleting '+data1);
                this.functionsService.alert(this.messages.ERROR_DELETING_RECORD + data1, this.constants.UI_COMPONENT_TEXT__VALUE__OKAY);
              }
              this.getDate(this.selectedDate, this.selectedLocation);
            });
          },
        },
      ],
    });
    await alert.present();
  }

  //present View Detail
  async presentModal(data: any) {
    const popover = await this.popover.create({
      component: ChhAppPatientDetailsPage,
      showBackdrop: true,
      translucent: true,
      componentProps: {
        appt_id: data,
        backdropDismiss: true,
      },
    });
    popover.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  //present addPatient
  async showaddmodal() {
    const modal = await this.modalController.create({
      component: ChhAppAddAppointmentsModalPage,
      componentProps: {
        appt_id: this.selectedLocation,
        backdropDismiss: true,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.getDate(this.selectedDate, this.selectedLocation);
    });
    return await modal.present();
  }

  //change location
  locationAction(data: any) {
    if (this.selectedLocation != data) {
      this.buttonDisablerHospSelector = true;
      this.selectedLocation = data;
      this.getDate(this.selectedDate, data);
    }
  }

  //change date + -
  adjustDate(data1: any) {
    this.selectedDate = this.functionsService.incrementDate(this.selectedDate, data1);
    this.getDate(this.selectedDate, this.selectedLocation);
  }

  //change date modal date
  dateChanged(data1: any) {
    this.buttonDisablerDateSelector = true;
    this.selectedDate = data1;
    this.getDate(this.selectedDate, this.selectedLocation);
  }

  getDate(data1: any, data2: any) {
    this.jsonObj5 = [];
    var myObject = {};
    var jsonObj2 = [];
    var item1 = {};

    this.isFetchDone = false;

    this.patientService.retrieveSchedTime(this.dr_code, data1, data2).subscribe(
      (patientService: any) => {
        let parseddata = JSON.parse(patientService);
        item1["date"] = data1;
        parseddata.forEach((element) => {
          if (element.appt_id != null) {
            element.appt_last_name = element.appt_last_name.toUpperCase();
            element.appt_first_name = this.camelCase(element.appt_first_name);
            jsonObj2.push({
              appt_id: element.appt_id,
              patientName:
                element.appt_last_name + ", " + element.appt_first_name,
              time: element.time_desc,
              status: element.remarks,
            });
          }
        });
        item1["data"] = jsonObj2;
        this.jsonObj5.push(item1);
        //check if subscribed item has value
        let varhandler = JSON.stringify(this.jsonObj5);
        if (varhandler.includes("appt_id")) {
          this.objecthandler = true;
        } else {
          this.objecthandler = false;
        }
      },
      (error) => {
        this.buttonDisablerHospSelector = false;
        this.buttonDisablerDateSelector = false;
        this.isFetchDone = true;
      },
      () => {
        this.buttonDisablerHospSelector = false;
        this.buttonDisablerDateSelector = false;
        this.isFetchDone = true;
        //this.functionsService.logToConsole(this.jsonObj5);
      }
    );
  }

  ngOnInit() {
    this.$gaService.pageView("/Appointments", "Appointments Tab");
    //this.selectedDate = this.yyyymmdd();
    //this.selectedLocation = "C";
    //this.getDate(this.selectedDate,this.selectedLocation);
  }

  ionViewWillEnter() {
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_code = this.logindata[0].dr_code;
    let  dr_name = this.logindata[0].last_name;
    this.$gaService.event('Appointments','User Flow',dr_name);
    if (this.selectedDate == null) {
      this.selectedDate = this.functionsService.getSystemDate();
      this.selectedLocation = this.constants.CHH_SITE__CODE__CEBU; /*"C"*/
    }
    this.getDate(this.selectedDate, this.selectedLocation);
  }

  //generate date
 /*  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  } */

 /*  incrementDate(date_str, incrementor) {
    var parts = date_str.split("-");
    var dt = new Date(
      parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setTime(dt.getTime() + incrementor * 86400000);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  } */

  //swipe action
  doRefresh(event) {
    setTimeout(() => {
      this.getDate(this.selectedDate, this.selectedLocation);
      event.target.complete();
    }, 1000);
  }

  camelCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }
}
