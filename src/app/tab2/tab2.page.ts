import { Component, OnInit } from "@angular/core";
import { PatientService } from "../services/patient.service";
import { ModalController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { DoctorService } from "../services/doctor.service";
import { HostListener } from "@angular/core";
import { PatientdetailsPage } from "../components/patientdetailss/patientdetails.page";
import { ScreensizeService } from "../services/screensize.service";
import { ActionSheetController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { AddAppointmentsModalPage } from "../chh-web-components/chh-app-add-appointments-modal/chh-app-add-appointments-modal.page";
import { ToastService } from "../services/toast.service";
import { LoadingController } from "@ionic/angular";
import { LoginData } from "../models/logindata.model";
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  isDesktop: boolean;
  displaydata = "chhc";
  segment = "chhc";
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

  constructor(
    private patientService: PatientService,
    private modalController: ModalController,
    private authService: AuthService,
    private doctorService: DoctorService,
    private screensizeService: ScreensizeService,
    private popover: PopoverController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private toast: ToastService,
    public loadingController: LoadingController,
    protected $gaService: GoogleAnalyticsService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  async Alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  }

  //present View & Delete
  async presentActionSheet(data1: any, data2: any, data3: any) {
    if (data2 == "Reserved") {
      const actionSheet = await this.actionSheetController.create({
        cssClass: "my-custom-class",
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            icon: "trash",
            handler: () => {
              this.presentAlertConfirm(data3, data1);
            },
          },
          { text: "Cancel", icon: "close", role: "cancel" },
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
        "Are you sure you want to delete <strong>" + data1 + "</strong>'s appointment?",
      buttons: [
        { text: "Cancel", role: "cancel", cssClass: "secondary" },
        {
          text: "Sure",
          handler: () => {
            this.patientService.deletePatients(data2).subscribe((res: any) => {
              if (res == "UPDATED") {
                //this.toast.presentToast('Successfully Deleted '+data1);
                this.Alert("Successfully Deleted " + data1, "Okay");
              } else {
                //this.toast.presentToast('Error on Deleting '+data1);
                this.Alert("Error on Deleting " + data1, "Okay");
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
      component: PatientdetailsPage,
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
      component: AddAppointmentsModalPage,
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
    this.selectedDate = this.incrementDate(this.selectedDate, data1);
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
        //console.log(this.jsonObj5);
      }
    );
  }

  ngOnInit() {
    this.$gaService.pageView('/Appointments', 'Appointments Tab');
    //this.selectedDate = this.yyyymmdd();
    //this.selectedLocation = "C";
    //this.getDate(this.selectedDate,this.selectedLocation);
  }

  ionViewWillEnter() {
    if (!this.dr_code) {
      this.logindata = <LoginData>this.authService.userData$.getValue();
      this.dr_code = this.logindata[0].dr_code;
    }

    if (this.selectedDate == null) {
      this.selectedDate = this.yyyymmdd();
      this.selectedLocation = "C";
    }
    this.getDate(this.selectedDate, this.selectedLocation);
  }

  //generate date
  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  }

  incrementDate(date_str, incrementor) {
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
  }

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
