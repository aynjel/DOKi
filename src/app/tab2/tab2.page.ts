import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { HostListener  } from "@angular/core";
import { PatientdetailsPage } from '../components/patientdetailss/patientdetails.page';
import { ScreensizeService } from '../services/screensize.service';
import { ActionSheetController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular'; 
import { AlertController } from '@ionic/angular';
import { AddappointmentsmodalPage } from '../components/addappointmentsmodal/addappointmentsmodal.page';
import { ToastService } from '../services/toast.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isDesktop: boolean;
  displayUserData:any;
  displaydata = "chhc";
  segment = "chhc";
  sidesegment = "today";
  selectedDate:any;
  selectedLocation:any;
  jsonObj5 = [];
  objecthandler:boolean=false;
  customPickerOptions: any;
  isDisabled:boolean = false;
  public items:string[]=[];
  buttonDisablerHospSelector:boolean = false;
  buttonDisablerDateSelector:boolean = false;
  constructor(
      private patientService:PatientService,
      private modalController: ModalController,
      private authService:AuthService,
      private doctorService:DoctorService,
      private screensizeService: ScreensizeService,
      private popover:PopoverController,
      public actionSheetController: ActionSheetController,
      public alertController: AlertController,
      private toast:ToastService,
      public loadingController: LoadingController
    ) {  

      this.customPickerOptions = {
        buttons: [
          {text: 'Cancel',handler: (res:any) => {}},
          {text: 'Ok',
            handler: (res:any) => {
              let parseddata = JSON.stringify(res);
              var obj = JSON.parse(parseddata);
              this.dateChanged(obj.year.value+'-'+obj.month.value+'-'+obj.day.value);
          }}
      ]
      };
      this.screensizeService.isDesktopView().subscribe(isDesktop => {
        if (this.isDesktop && !isDesktop) {window.location.reload();}this.isDesktop = isDesktop;
      });

  }



  //present View & Delete
  async presentActionSheet(data1:any,data2:any,data3:any) {
 

    if(data2 == "Reserved"){
      const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [
          {text: 'Delete',role: 'destructive',icon: 'trash',handler: () => {console.log('Delete clicked : '+data1);this.presentAlertConfirm(data3,data1);}},
          {text: 'View',icon: 'eye',handler: () => {console.log('View clicked');this.presentModal(data1);}},
          {text: 'Cancel',icon: 'close',role: 'cancel'}
        ]
      });
      await actionSheet.present();
    }else{
      const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [
          {text: 'View',icon: 'eye',handler: () => {console.log('View clicked');this.presentModal(data1);}},
          {text: 'Cancel',icon: 'close',role: 'cancel',handler: () => {console.log('Cancel clicked');}}
        ]
      });
      await actionSheet.present();
    }


  }
  //Affirm Delete
  async presentAlertConfirm(data1:any,data2:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure you want to delete <strong>'+data1+'</strong> ?',
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Sure',handler: () => {this.patientService.deletePatients(data2).subscribe((patientService:any)=>{console.log(patientService);});}}
      ]
    });
    await alert.present();
  }
  //present View Detail
  async presentModal(data:any) {
    const popover = await this.popover.create({
      component: PatientdetailsPage,showBackdrop:true,translucent: true,
      componentProps: { 
        appt_id: data,
        backdropDismiss: true
      }
    });
    popover.present();
    /*
   const modal = await this.modalController.create({
     component: PatientdetailsPage,
     componentProps: { 
      appt_id: data,
      backdropDismiss: true
    }
   });
    return await modal.present();*/
  }



  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  //present addPatient
  async showaddmodal(){
   const modal = await this.modalController.create({
     component: AddappointmentsmodalPage,
     componentProps: { 
      appt_id: this.selectedLocation,
      backdropDismiss: true,
    }
   });
   modal.onDidDismiss()
   .then((data) => {
     console.log(data);
 });
    return await modal.present();
  }

  locationAction(data:any){
    if(this.selectedLocation != data){
      this.buttonDisablerHospSelector = true;
      this.selectedLocation = data;
      this.getDate(this.selectedDate,data);
    }
  }
  adjustDate(data1:any){
    this.selectedDate = this.incrementDate(this.selectedDate,data1);
    this.getDate(this.selectedDate,this.selectedLocation);
  }
  dateChanged(data1:any){
    this.buttonDisablerDateSelector = true;
    console.log("changed data: "+data1);
    this.selectedDate = data1;
    this.getDate(this.selectedDate,this.selectedLocation);

  }

  getDate(data1:any,data2:any){

    this.jsonObj5=[];
    this.displayUserData = localStorage.getItem('dr_code');
 
    var myObject = {};var jsonObj2 = [];var item1 = {}
    this.patientService.retrieveSchedTime(""+this.displayUserData,data1,data2).subscribe(
      (patientService:any) => {
        // Handle result
        let parseddata = JSON.parse((patientService));
          item1 ["date"] =data1;
          parseddata.forEach(element => {
            if(element.appt_id != null){    
              jsonObj2.push({"appt_id":element.appt_id,"patientName":element.appt_last_name+", "+element.appt_first_name,"time":element.time_desc,"status":element.remarks});
            }
          }
          ); 
          item1 ["data"] = jsonObj2;
          this.jsonObj5.push(item1);
          let varhandler = JSON.stringify(this.jsonObj5);
          if(varhandler.includes("appt_id")){
            this.objecthandler = true;
          }else{
            this.objecthandler =false;
          }
      },
      error => {
        console.log("error : "+error);
        this.buttonDisablerHospSelector = false;
        this.buttonDisablerDateSelector = false;
      },
      () => {
        console.log("Completed");
        this.buttonDisablerHospSelector = false;
        this.buttonDisablerDateSelector = false;
      }


    );
 
          
   
  }
  ngOnInit() {

    this.selectedDate = this.yyyymmdd();
    this.selectedLocation = "C";
    this.getDate(this.selectedDate,this.selectedLocation);

  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.selectedDate = this.yyyymmdd();
    this.selectedLocation = "C";
    this.getDate(this.selectedDate,this.selectedLocation);
  }

  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return '' + y+"-" + mm+"-"  + dd;
  }
  incrementDate(date_str, incrementor) {
    var parts = date_str.split("-");
    var dt = new Date(
        parseInt(parts[0], 10),      // year
        parseInt(parts[1], 10) - 1,  // month (starts with 0)
        parseInt(parts[2], 10)       // date
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
  }
   doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getDate(this.selectedDate,this.selectedLocation);
      event.target.complete();
    }, 1000);
  }
  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
}
