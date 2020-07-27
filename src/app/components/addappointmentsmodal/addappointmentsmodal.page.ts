import { Component, OnInit,Input } from '@angular/core';
import { ScreensizeService } from '../../services/screensize.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PatientService } from '../../services/patient.service';
import {LoginData} from '../../models/logindata.model';
import { AuthService } from 'src/app/services/auth.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-addappointmentsmodal',
  templateUrl: './addappointmentsmodal.page.html',
  styleUrls: ['./addappointmentsmodal.page.scss'],
})
export class AddappointmentsmodalPage implements OnInit {
  @Input() appt_id: any;
  doctorSchedule:any;
  isDesktop: boolean;
  dr_code:any;
  general = 70;
  volume = 60;
  mobile = 30;
  calendar: Date;
  Weekdays = new Array();
  disableWeekDays1 = new Array();
  total = [0,1,2,3,4,5,6];
  mydate1 = this.yyyymmdd();
  mydate2 = '1990-01-01';
  mydate3 = "";
  fname:any;
  mname:any;
  lname:any;
  gender:any;
  time:any;
  adrress:any;
  contact:any;
  location:any;
  btnSave:boolean = false;
  // mydate1 = '11 Dec 2018';
  // mydate2 = '12 Dec 2018';
  // mydate3 = '13 Dec 2018';
  datePickerObj: any = {};
  datePickerObj2: any = {};

/*new date picker*/
datePickerObjForDateOfAppointment: any = {};
datePickerObjForBirthdate: any = {};

/*new date picker*/

/* for ux */
uxUserInfo = true;
uxEndpart = true;
uxSaveCancel = true;

  constructor(
      private screensizeService: ScreensizeService,
      private modalController:ModalController,
      private patientService:PatientService,
      private authService:AuthService,
      public modalCtrl: ModalController,
      private toast:ToastService,
      public alertController: AlertController){
        this.screensizeService.isDesktopView().subscribe(isDesktop => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
        });
        if(!this.dr_code){
          let logindata = <LoginData>this.authService.userData$.getValue();
          this.dr_code = logindata[0].dr_code;
        }
}


  jsonObj2 = [];
  async Alert(data1:any,data2:any) {const alert = await this.alertController.create({cssClass: 'my-custom-class',message: data1,buttons: [{text: data2,handler: () => {}}]});await alert.present();}


  ngOnInit() {
    this.location = this.appt_id;
    this.retriveMTWThFSS(this.dr_code,this.appt_id);
    this.setDatepicker();
    this.pickTime();
    /*new date picker*/
    this.datePickerObjForDateOfAppointment = {
      inputDate: new Date(),
      dateFormat: "YYYY-MM-DD",
      disableWeekDays: this.disableWeekDays1,
      btnProperties: {
        expand: "block", // "block" | "full"
        fill: "", // "clear" | "default" | "outline" | "solid"
        size: "", // "default" | "large" | "small"
        disabled: "", // boolean (default false)
        strong: "", // boolean (default false)
        color: ""
  
      }
    };
    this.datePickerObjForBirthdate = {
      inputDate: this.mydate2,
      dateFormat: "YYYY-MM-DD",
      btnProperties: {
        expand: "block", // "block" | "full"
        fill: "", // "clear" | "default" | "outline" | "solid"
        size: "", // "default" | "large" | "small"
        disabled: "", // boolean (default false)
        strong: "", // boolean (default false)
        color: ""
  
      }
    };
    
    /*new date picker*/
  }



  /*for ux*/
  uxTime(){
    this.uxUserInfo = false;
  }
  userInfo(){
    console.log(this.gender);
    if(this.fname != null && this.lname != null && this.gender != null){
      this.uxEndpart = false;
    }else{
      this.uxEndpart = true;
    }
  }

  address(){
    console.log(this.adrress);
    if(this.adrress != null){
     
      this.uxSaveCancel = false;
    }else if(this.adrress == ""){
      console.log("--"+this.adrress);
      this.uxSaveCancel = true;
    }
  }




    /*new date picker*/
  async openDatePickerForDateOfAppointment() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: "li-ionic4-datePicker",
      componentProps: { objConfig: this.datePickerObjForDateOfAppointment }
    });
    await datePickerModal.present();
    datePickerModal.onDidDismiss().then(data => {
     if(data.data.date != 'Invalid date'){
      this.mydate1 = data.data.date;
      this.pickTime();
     }
    });
  }
  async openDatePickerForBirthdate() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: "li-ionic4-datePicker",
      componentProps: { objConfig: this.datePickerObjForBirthdate }
    });
    await datePickerModal.present();
    datePickerModal.onDidDismiss().then(data => {
     if(data.data.date != 'Invalid date'){
      this.mydate2 = data.data.date;
      this.pickTime();
     }
    });
  }
      /*new date picker*/








  pickLocation(){
    this.retriveMTWThFSS(this.dr_code,this.location);
    //this.setDatepicker();
  }
  /*old date picker*/
  setDatepicker(){
        // EXAMPLE OBJECT
        this.datePickerObj2 = {
          closeOnSelect: true,
          todayLabel: '',
          titleLabel: "Select Birthdate",
          dateFormat: 'YYYY-MM-DD',
          btnProperties: {
            expand: "block", // "block" | "full"
            fill: "clear", // "clear" | "default" | "outline" | "solid"
            size: "small", // "default" | "large" | "small"
            disabled: "", // boolean (default false)
            strong: true, // boolean (default false)
            color: ""
          }
        };
        // EXAMPLE OBJECT
        this.datePickerObj = {

          closeOnSelect: true,
          disableWeekDays: this.disableWeekDays1,
         
          // mondayFirst: true,
          // setLabel: 'Select a Date',
          todayLabel: '',
          // closeLabel: 'Close',
          // disabledDates: [],
          titleLabel: "Select Date of Appointment",
          // monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          // weeksList: ['S', 'S', 'M', 'T', 'W', 'T', 'F'],
          dateFormat: 'YYYY-MM-DD',
          // clearButton: false,
          // momentLocale: 'pt-BR',
          // yearInAscending: true,
          // btnCloseSetInReverse: false,
    
          btnProperties: {
            expand: "block", // "block" | "full"
            fill: "clear", // "clear" | "default" | "outline" | "solid"
            size: "small", // "default" | "large" | "small"
            disabled: "", // boolean (default false)
            strong: true, // boolean (default false)
            color: ""
            // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
          }
        };
  }
  /*old date picker*/
  retriveMTWThFSS(data1:any, data2:any){
    this.disableWeekDays1 = new Array();
    this.Weekdays = new Array();
    this.patientService.retrieveMTWTFSS(data1,data2).subscribe(
      
      (res:any)=>{
        console.log(res);
      let parseddata = JSON.parse((res));
      parseddata.forEach(element => {
          if(element.sched_day == "SUNDAY"){this.Weekdays.push(0);}
          else if(element.sched_day == "MONDAY"){this.Weekdays.push(1);}
          else if(element.sched_day == "TUESDAY"){this.Weekdays.push(2);}
          else if(element.sched_day == "WEDNESDAY"){this.Weekdays.push(3);}
          else if(element.sched_day == "THURSDAY"){this.Weekdays.push(4);}
          else if(element.sched_day == "FRIDAY"){this.Weekdays.push(5);}
          else if(element.sched_day == "SATURDAY"){this.Weekdays.push(6);}
       });
       var i;
       for(i=0;i<=this.total.length-1;i++){
        var x=0;
        for(var j=0;j<=this.Weekdays.length-1;j++){if(this.total[i] == this.Weekdays[j]){x=1;}}
         if(!x){this.disableWeekDays1.push(i);}
        }
    },error => {


    },() => {
      if(this.disableWeekDays1.length >= 7){
          this.btnSave=true;
          this.Alert('No Available Schedule for '+this.mydate1,'Okay');
      }
      console.log(this.disableWeekDays1);
    }
    
    
    );
  }
  pickTime(){
    //console.log(this.mydate1+" | "+this.dr_code );
    this.doctorSchedule=[];
  
    this.patientService.retrieveSchedTime(this.dr_code,this.mydate1,this.location).subscribe((res:any)=>{
  
      res = JSON.parse(res);
      let x=0;
      res.forEach(element => {
        x++;
         if(element.appt_id == null){
           this.doctorSchedule.push(element);
            this.doctorSchedule.push({"time_in":element.time_in,"time_out":element.time_out,"slot":x});
          }
      });
       //this.doctorSchedule = JSON.parse(res);
    });
  }
  async closeModal() {
    await this.modalController.dismiss();
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
  save(){
    this.patientService.addAppointments(this.dr_code,this.mydate1,this.time,this.lname,this.fname,this.mname,this.gender,this.mydate2,this.adrress,this.contact,this.appt_id).subscribe((res:any)=>{
     //this.doctorSchedule = res;
     console.log(res);
      if(res){
        this.Alert('Successfully added ' +this.lname+', '+this.fname,'Okay');
        //this.toast.presentToast('Successfully added ' +this.lname+', '+this.fname);
      }else{
        this.Alert('Error saving ' +this.lname+', '+this.fname,'Okay');
        //this.toast.presentToast('Error saving ' +this.lname+', '+this.fname);
      }
      this.closeModal();
  });
  }

}
