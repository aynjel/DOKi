import { Component, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthConstants } from '../config/auth-constants';
import { DoctorService } from '../services/doctor.service';
import { ModalController, AlertController } from '@ionic/angular';
import { PatientdetailsPage } from '../components/patientdetailss/patientdetails.page';
import { ScreensizeService } from '../services/screensize.service';
import { PopoverController } from '@ionic/angular';  
import {InpatientmodalPage} from '../components/inpatientmodal/inpatientmodal.page';

import { timeStamp } from 'console';
import {DoctorInfoGlobal} from '../common/doctorinfo-global';
import {LoginData} from '../models/logindata.model';
import {InpatientData} from '../models/inpatient.model';
import { Location } from "@angular/common";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})

export class Tab1Page {
  public logindata: LoginData;
  public inPatientData: InpatientData;
  isDesktop: boolean;
  isFetchDone: boolean = false;
  dr_code = "";
  inPatients: any;
  inPatientsDraft: any;
  inPatientsDraft1: any;
  site: any = "A";
  searchBar: any;
  name: any;
  admittedOrDischarge = "ALL";
  admittedOrDischargeLabel = "";
  route: string;
  objecthandler: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private doctorService: DoctorService,
    private modalController: ModalController,
    private screensizeService: ScreensizeService,
    private popover: PopoverController,
    private location: Location,
    public alertController: AlertController,
    private renderer: Renderer2
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
    router.events.subscribe((val) => {
      if (location.path() == "/menu/in-patients") {
        this.admittedOrDischarge = "ALL";
        this.admittedOrDischargeLabel = "";
      } else if (location.path() == "/menu/in-patients/AC") {
        this.admittedOrDischarge = "AC";
        this.admittedOrDischargeLabel = "(Admitted)";
      } else if (location.path() == "/menu/in-patients/DN") {
        this.admittedOrDischarge = "DN";
        this.admittedOrDischargeLabel = "(for Discharge)";
      }
    });
  }

  ngOnInit() {}
  async Alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  }

  filterList() {
    if (this.site == "A") {
      this.inPatients = [];
      this.inPatients = this.inPatientsDraft;
    } else {
      this.inPatients = [];
      this.inPatientsDraft.forEach((element) => {
        if (this.site == "C") {
          if (element.site == "C") {
            this.inPatients.push(element);
          }
        } else if (this.site == "M") {
          if (element.site == "M") {
            this.inPatients.push(element);
          }
        }
      });
    }
    this.inPatientsDraft1 = this.inPatients;
    if (this.searchBar) {
      this.inPatients = [];
      this.inPatientsDraft1.forEach((e) => {
        this.name =
          e.last_name +
          ", " +
          e.first_name +
          " " +
          e.middle_name +
          " " +
          e.first_name +
          " " +
          e.middle_name +
          " " +
          e.last_name;
        if (this.name.toLowerCase().includes(this.searchBar.toLowerCase())) {
          this.inPatients.push(e);
        }
      });
    }

    /*check if ALL - ADMITTED - FOR DISCHARGE*/
    if (this.admittedOrDischarge != "ALL") {
      let verifier: boolean = false; //to verify if naa ba jud na check na value AC or DN
      let sampleInPatients1 = [];
      this.inPatients.forEach((element) => {
        if (this.admittedOrDischarge == "AC") {
          verifier = true;
          if (element.admission_status == "AC") {
            sampleInPatients1.push(element);
          }
        } else if (this.admittedOrDischarge == "DN") {
          verifier = true;
          if (element.admission_status == "DN") {
            sampleInPatients1.push(element);
          }
        }
      });

      if (verifier) {
        this.inPatients = [];
        this.inPatients = sampleInPatients1;
      }
    }
  }

  //Fired when the component routing to is about to animate into view.
  ionViewWillEnter() {
    if (!this.dr_code) {
      this.logindata = <LoginData>this.authService.userData$.getValue();
      this.dr_code = this.logindata[0].dr_code;
    }
    this.callPatient(this.site);
  }

  //Get using Doctors API
  callPatient(data: any) {
    this.isFetchDone = false;
    
    setTimeout(() => {
      this.doctorService.getInPatient(this.dr_code).subscribe(
        (res: any) => {
          if (res.length) {
            this.objecthandler = true;
          } else {
            this.objecthandler = false;
          }
          this.inPatientsDraft = [];
          res.forEach((element) => {
            element.last_name = element.last_name.toUpperCase();
            element.middle_name = this.camelCase(element.middle_name);
            element.first_name = this.camelCase(element.first_name);
  
            this.inPatientsDraft.push(element);
          });
          this.filterList();
        },
        (error) => {
          this.isFetchDone = true;
          this.Alert("Server Error", "Okay");
        },
        () => {
          this.isFetchDone = true;
        }
      );
    }, 1000);
  }
    
  //swipe down refresh
  doRefresh(event) {
    setTimeout(() => {
      this.callPatient(this.site);
      //location.reload();
      event.target.complete();
    }, 1000);
  }

  async detail(data: any) {
    const modal = await this.modalController.create({
      component: InpatientmodalPage,
      componentProps: { data: data },
      cssClass: "my-custom-modal-inpatient-css",
    });
    modal.present();
    return await modal.onDidDismiss().then((data: any) => {
      this.callPatient(this.site);
    });
  }

  //location is changed
  locationAction(data: any) {
    if (data == "A" || data == "C" || data == "M") {
      this.site = data;
    } else {
      this.admittedOrDischarge = data;
    }
    this.filterList();
  }

  camelCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  onSubmit(data1: any, data2: boolean) {
    if (data1 == "ALL") {
      this.router.navigate(["/menu/in-patients"]);
    } else if (data1 == "AC") {
      this.router.navigate(["/menu/in-patients/AC"]);
    } else if (data1 == "DN") {
      this.router.navigate(["/menu/in-patients/DN"]);
    }
  }
}
