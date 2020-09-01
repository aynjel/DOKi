import { Component, OnInit, Input } from "@angular/core";
import { ScreenSizeService } from "../../services/screen-size/screen-size.service";
import { ModalController, AlertController } from "@ionic/angular";
import { PatientService } from "../../services/patient/patient.service";
import { LoginData } from "../../models/login-data.model";
import { AuthService } from "src/app/services/auth/auth.service";
import { Ionic4DatepickerModalComponent } from "@logisticinfotech/ionic4-datepicker";
import { ToastService } from "../../services/toast/toast.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { Constants } from "../../shared/constants";
import { FunctionsService } from "../../shared/functions/functions.service";

@Component({
  selector: "app-add-appointments-modal",
  templateUrl: "./chh-app-add-appointments-modal.page.html",
  styleUrls: ["./chh-app-add-appointments-modal.page.scss"],
})

export class ChhAppAddAppointmentsModalPage implements OnInit {
  @Input() appt_id: any;
  doctorSchedule: any;
  isDesktop: boolean;
  dr_code: any;
  general = 70;
  volume = 60;
  mobile = 30;
  calendar: Date;
  Weekdays = new Array();
  disableWeekDays1 = new Array();
  total = [0, 1, 2, 3, 4, 5, 6];
  mydate1 = this.functionsService.getSystemDate();
  mydate2 = "1990-01-01";
  mydate3 = "";
  fname: any;
  mname: any;
  lname: any;
  gender: any;
  time: any;
  adrress: any;
  contact: any;
  location: any;
  btnSave: boolean = false;
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
    private screensizeService: ScreenSizeService,
    private modalController: ModalController,
    private patientService: PatientService,
    private authService: AuthService,
    public modalCtrl: ModalController,
    private toast: ToastService,
    public functionsService: FunctionsService,
    protected $gaService: GoogleAnalyticsService,
    private constants: Constants
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    if (!this.dr_code) {
      let logindata = <LoginData>this.authService.userData$.getValue();
      this.dr_code = logindata[0].dr_code;
    }
  }

  jsonObj2 = [];

  ngOnInit() {
    this.$gaService.pageView(
      "/Appointments/Add Appointments",
      "Add Appointments Modal"
    );
    this.location = this.appt_id;
    this.retriveMTWThFSS(this.dr_code, this.appt_id);
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
        color: "",
      },
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
        color: "",
      },
    };

    /*new date picker*/
  }

  /*for ux*/
  uxTime() {
    console.log(this.time);
    if (this.time != null) {
      this.uxUserInfo = false;
    } else {
      this.uxUserInfo = true;
    }
  }

  userInfo() {
    console.log(this.gender);
    if (this.fname != null && this.lname != null && this.gender != null) {
      this.uxEndpart = false;
    } else {
      this.uxEndpart = true;
    }
  }

  address() {
    console.log(this.adrress);
    if (this.adrress != null) {
      this.uxSaveCancel = false;
    } else if (this.adrress == "") {
      console.log("--" + this.adrress);
      this.uxSaveCancel = true;
    }
  }

  /*new date picker*/
  async openDatePickerForDateOfAppointment() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: "li-ionic4-datePicker",
      componentProps: { objConfig: this.datePickerObjForDateOfAppointment },
    });
    await datePickerModal.present();
    datePickerModal.onDidDismiss().then((data) => {
      if (data.data.date != "Invalid date") {
        this.mydate1 = data.data.date;
        this.pickTime();
      }
    });
  }

  async openDatePickerForBirthdate() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: "li-ionic4-datePicker",
      componentProps: { objConfig: this.datePickerObjForBirthdate },
    });
    await datePickerModal.present();
    datePickerModal.onDidDismiss().then((data) => {
      if (data.data.date != "Invalid date") {
        this.mydate2 = data.data.date;
        this.pickTime();
      }
    });
  }
  /*new date picker*/

  pickLocation() {
    this.retriveMTWThFSS(this.dr_code, this.location);
    //this.setDatepicker();
  }

  /*old date picker*/
  setDatepicker() {
    // EXAMPLE OBJECT
    this.datePickerObj2 = {
      closeOnSelect: true,
      todayLabel: "",
      titleLabel: "Select Birthdate",
      dateFormat: "YYYY-MM-DD",
      btnProperties: {
        expand: "block", // "block" | "full"
        fill: "clear", // "clear" | "default" | "outline" | "solid"
        size: "small", // "default" | "large" | "small"
        disabled: "", // boolean (default false)
        strong: true, // boolean (default false)
        color: "",
      },
    };
    // EXAMPLE OBJECT
    this.datePickerObj = {
      closeOnSelect: true,
      disableWeekDays: this.disableWeekDays1,

      // mondayFirst: true,
      // setLabel: 'Select a Date',
      todayLabel: "",
      // closeLabel: 'Close',
      // disabledDates: [],
      titleLabel: "Select Date of Appointment",
      // monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      // weeksList: ['S', 'S', 'M', 'T', 'W', 'T', 'F'],
      dateFormat: "YYYY-MM-DD",
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
        color: "",
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      },
    };
  }

  /*old date picker*/
  retriveMTWThFSS(data1: any, data2: any) {
    this.disableWeekDays1 = new Array();
    this.Weekdays = new Array();
    this.patientService.retrieveMTWTFSS(data1, data2).subscribe(
      (res: any) => {
        console.log(res);
        let parseddata = JSON.parse(res);
        parseddata.forEach((element) => {
          if (element.sched_day == this.constants.WEEK_DAY__VALUE__SUNDAY) {
            this.Weekdays.push(this.constants.WEEK_DAY__CODE__SUNDAY);
          } else if (
            element.sched_day == this.constants.WEEK_DAY__VALUE__MONDAY
          ) {
            this.Weekdays.push(this.constants.WEEK_DAY__CODE__MONDAY);
          } else if (
            element.sched_day == this.constants.WEEK_DAY__VALUE__TUESDAY
          ) {
            this.Weekdays.push(this.constants.WEEK_DAY__VALUE__TUESDAY);
          } else if (
            element.sched_day == this.constants.WEEK_DAY__VALUE__WEDNESDAY
          ) {
            this.Weekdays.push(this.constants.WEEK_DAY__CODE__WEDNESDAY);
          } else if (
            element.sched_day == this.constants.WEEK_DAY__VALUE__THURSDAY
          ) {
            this.Weekdays.push(this.constants.WEEK_DAY__CODE__THURSDAY);
          } else if (
            element.sched_day == this.constants.WEEK_DAY__VALUE__FRIDAY
          ) {
            this.Weekdays.push(this.constants.WEEK_DAY__CODE__FRIDAY);
          } else if (
            element.sched_day == this.constants.WEEK_DAY__VALUE__SATURDAY
          ) {
            this.Weekdays.push(this.constants.WEEK_DAY__CODE__SATURDAY);
          }
        });
        var i;
        for (i = 0; i <= this.total.length - 1; i++) {
          var x = 0;
          for (var j = 0; j <= this.Weekdays.length - 1; j++) {
            if (this.total[i] == this.Weekdays[j]) {
              x = 1;
            }
          }
          if (!x) {
            this.disableWeekDays1.push(i);
          }
        }
      },
      (error) => {},
      () => {
        if (this.disableWeekDays1.length >= 7) {
          this.btnSave = true;
          this.functionsService.alert(
            "Upon checking, there is no available schedule for " +
              this.mydate1 +
              ". You may also want to try changing the Hospital site.",
            "Okay"
          );
        }
        console.log(this.disableWeekDays1);
      }
    );
  }

  pickTime() {
    //console.log(this.mydate1+" | "+this.dr_code );
    this.doctorSchedule = [];

    this.patientService
      .retrieveSchedTime(this.dr_code, this.mydate1, this.location)
      .subscribe((res: any) => {
        res = JSON.parse(res);
        let x = 0;
        res.forEach((element) => {
          x++;
          if (element.appt_id == null) {
            //this.doctorSchedule.push(element);
            this.doctorSchedule.push({
              time_in: element.time_in,
              time_out: element.time_out,
              slot: x,
            });
          }
        });
        //this.doctorSchedule = JSON.parse(res);
      });
  }

 /*  async closeModal() {
    await this.modalController.dismiss();
  } */

  save() {
    this.patientService
      .addAppointments(
        this.dr_code,
        this.mydate1,
        this.time,
        this.lname,
        this.fname,
        this.mname,
        this.gender,
        this.mydate2,
        this.adrress,
        this.contact,
        this.appt_id
      )
      .subscribe((res: any) => {
        //this.doctorSchedule = res;
        console.log(res);
        if (res) {
          this.functionsService.alert(
            "Way to go, Doc! Your patient, " +
              this.lname +
              " , " +
              this.fname +
              ", has been booked successfully!",
            "Okay"
          );
          //this.toast.presentToast('Successfully added ' +this.lname+', '+this.fname);
        } else {
          this.functionsService.alert(
            "U-oh! We cannot book your patient, " +
              this.lname +
              ", " +
              this.fname +
              ", at this time. Please try again, Doc.",
            "Okay"
          );
          //this.toast.presentToast('Error saving ' +this.lname+', '+this.fname);
        }
        this.functionsService.closeModal(this.modalController);
      });
  }
}
