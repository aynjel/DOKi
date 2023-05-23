import { Component, Renderer2 } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage/storage.service";
import { Consta } from "../config/auth-constants";

import { DoctorService } from "../services/doctor/doctor.service";
import { ModalController, NavController } from "@ionic/angular";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { PopoverController } from "@ionic/angular";
import { InPatientData } from "../models/in-patient.model";
import { Location } from "@angular/common";
//import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { FunctionsService } from "../shared/functions/functions.service";
import { Constants } from "../shared/constants";
import { Messages } from "../shared/messages";
import { PatientService } from "../services/patient/patient.service";
import {
  InpatientModelInpatients,
  LoginResponseModelv3,
} from "../models/doctor";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
@Component({
  selector: "app-tab-in-patients",
  templateUrl: "tab-in-patients.page.html",
  styleUrls: ["tab-in-patients.page.scss"],
})
export class TabInPatientsPage {
  isUporDown: boolean = false;
  inpatientModelInpatients = new InpatientModelInpatients();
  public logindata: LoginResponseModelv3;
  public inPatientData: InPatientData;
  isDesktop: boolean;
  isFetchDone: boolean = false;
  dr_code = "";
  inPatients: any;
  inPatientsDraft: any;
  inPatientsDraft1: any;
  site: any = this.constants.CHH_SITE__CODE__CEBU; //"A";
  searchBar: any;
  name: any;
  admittedOrDischarge = this.constants.ADMISSION_STATUS_SELECTION__VALUE__ALL; //"ALL";
  admittedOrDischargeLabel = "";
  route: string;
  objecthandler: boolean = false;
  data: any = [];
  isNotification: boolean;
  finalFullData = [];
  defaultAccordions;
  private ngUnsubscribe = new Subject();
  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService,
    private screensizeService: ScreenSizeService,
    private location: Location,
    public functionsService: FunctionsService,
    private renderer: Renderer2,

    public constants: Constants,
    public messages: Messages,
    public nav: NavController
  ) {
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
    router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe((val) => {
      if (location.path() == "/menu/in-patients") {
        this.admittedOrDischarge = this.constants.CHH_SITE__VALUE__ALL; //"ALL";
        this.admittedOrDischargeLabel = "";
      } else if (location.path() == "/menu/in-patients/AC") {
        this.admittedOrDischarge =
          this.constants.ADMISSION_STATUS__CODE__ADMITTED; //"AC";
        this.admittedOrDischargeLabel =
          "(" +
          this.functionsService.convertAllFirstLetterToUpperCase(
            this.constants.ADMISSION_STATUS__VALUE__ADMITTED
          ) +
          ")"; //"(Admitted)";
      } else if (location.path() == "/menu/in-patients/DN") {
        this.admittedOrDischarge =
          this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE; //"DN";
        this.admittedOrDischargeLabel = "(for Discharge)";
      }
    });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (
          this.router.routerState.snapshot.url.includes("/menu/in-patients")
        ) {
          this.callPatient(this.site);
        }
        // Perform any necessary actions after navigation, e.g., refresh data
      });
  }

  ngOnInit() {
    //////console.log('ngOnInit');

    let xdata = localStorage.getItem("reverseOrder");
    if (xdata == null) {
      localStorage.setItem("reverseOrder", "1");
    }
    this.reverseOrderData = localStorage.getItem("reverseOrder");
    this.checkAppearance();
  }
  dateToday;
  dateNow;

  checkInbox() {
    let data = {
      dt_from: this.functionsService.getDateYYYYMMDD(9999) + "T00:00:00.000Z",
      dt_to: this.functionsService.getDateYYYYMMDD() + "T00:00:00.000Z",
    };
    ////console.log(data);

    let jsonResponse = null;
    this.doctorService
      .getPendingApproval(data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          jsonResponse = res;
        },
        (error) => {
          ////console.log(error);
        },
        () => {
          this.isNotification = false;

          if (jsonResponse != null) {
            const hasApprovedStatus = (element) => {
              return (
                element.approval_status === "FA" ||
                element.approval_status === "RA"
              );
            };

            this.isNotification = jsonResponse.some(hasApprovedStatus);
          }
        }
      );
  }
  /* async Alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  } */

  filterList() {
    if (this.site == this.constants.CHH_SITE__CODE__ALL /*"A"*/) {
      this.inPatients = [];
      this.inPatients = this.inPatientsDraft;
      this.finalFullData = [];
    } else {
      this.inPatients = [];
      this.finalFullData = [];
      /*
      this.inPatientsDraft.forEach((element) => {
        if (this.site == this.constants.CHH_SITE__CODE__CEBU ) {
          if (element.site == this.constants.CHH_SITE__CODE__CEBU ) {
            this.inPatients.push(element);
          }
        } else if (
          this.site == this.constants.CHH_SITE__CODE__MANDAUE 
        ) {
          if (element.site == this.constants.CHH_SITE__CODE__MANDAUE ) {
            this.inPatients.push(element);
          }
        }
      });
    */

      if (this.site == this.constants.CHH_SITE__CODE__CEBU) {
        this.inPatients = this.inPatientsDraft.filter(
          (x) => x.site == this.constants.CHH_SITE__CODE__CEBU
        );
      } else if (this.site == this.constants.CHH_SITE__CODE__MANDAUE) {
        this.inPatients = this.inPatientsDraft.filter(
          (x) => x.site == this.constants.CHH_SITE__CODE__MANDAUE
        );
      }
    }
    this.inPatientsDraft1 = this.inPatients;
    if (this.searchBar) {
      this.inPatients = [];
      /*this.inPatientsDraft1.forEach((e) => {
        this.name =
          e.last_name +
          ', ' +
          e.first_name +
          ' ' +
          e.middle_name +
          ' ' +
          e.first_name +
          ' ' +
          e.middle_name +
          ' ' +
          e.last_name;
        if (this.name.toLowerCase().includes(this.searchBar.toLowerCase())) {
          this.inPatients.push(e);
        }
      });*/
      this.inPatients = this.inPatientsDraft1.filter(
        (e) =>
          (
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
            e.last_name
          )
            .toLowerCase()
            .includes(this.searchBar.toLowerCase()) ||
          e.floor_desc.toLowerCase().includes(this.searchBar.toLowerCase()) ||
          e.room_no.toLowerCase().includes(this.searchBar.toLowerCase())
      );
    }

    /*check if ALL - ADMITTED - FOR DISCHARGE*/
    if (
      this.admittedOrDischarge != this.constants.CHH_SITE__VALUE__ALL /*"ALL"*/
    ) {
      let verifier: boolean = false; //to verify if naa ba jud na check na value AC or DN
      let sampleInPatients1 = [];
      /*
      this.inPatients.forEach((element) => {
        if (
          this.admittedOrDischarge ==
          this.constants.ADMISSION_STATUS__CODE__ADMITTED 
        ) {
          verifier = true;
          if (
            element.admission_status ==
            this.constants.ADMISSION_STATUS__CODE__ADMITTED 
          ) {
            sampleInPatients1.push(element);
          }
        } else if (
          this.admittedOrDischarge ==
          this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE 
        ) {
          verifier = true;
          if (
            element.admission_status ==
            this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE 
          ) {
            sampleInPatients1.push(element);
          }
        }
      });
      */
      if (
        this.admittedOrDischarge ==
        this.constants.ADMISSION_STATUS__CODE__ADMITTED
      ) {
        verifier = true;

        sampleInPatients1 = this.inPatients.filter(
          (x) =>
            x.admission_status ==
            this.constants.ADMISSION_STATUS__CODE__ADMITTED
        );
      } else if (
        this.admittedOrDischarge ==
        this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE
      ) {
        verifier = true;

        sampleInPatients1 = this.inPatients.filter(
          (x) =>
            x.admission_status ==
            this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE
        );
      }
      if (verifier) {
        this.inPatients = [];
        this.inPatients = sampleInPatients1;
      }
    }
    let floorStack = [];
    let data;
    let xyz;
    let reference;
    //console.log(this.reverseOrderData);
    if (this.reverseOrderData == "1") {
      if (this.site == "C") {
        reference = this.constants.cebuRooms;
      } else {
        reference = this.constants.mandaueRooms;
      }
    } else {
      if (this.site == "C") {
        reference = this.constants.cebuRoomsReverse;
      } else {
        reference = this.constants.mandaueRoomsReverse;
      }
    }

    let stack = [...new Set(this.inPatients.map((d) => d.floor_desc))];
    stack = this.sortOrder(reference, stack);
    stack.forEach((element) => {
      if (this.defaultAccordions == null) {
        this.defaultAccordions = element;
      }
      floorStack.push({ floor: element });
    });
    floorStack.forEach((fs) => {
      data = this.inPatients.filter((x) => x.floor_desc == fs.floor);
      let designation;
      if (data.length == 1) {
        designation = "Patient";
      } else {
        designation = "Patients";
      }
      xyz = {
        floor: fs.floor,
        patients: data.length,
        designation: designation,
        data: data,
      };
      this.finalFullData.push(xyz);
    });
  }

  sortOrder(getOrder, getArr) {
    return getOrder.filter(function (order) {
      return getArr.some(function (list) {
        return order === list;
      });
    });
  }

  //Fired when the component routing to is about to animate into view.
  ionViewWillEnter() {
    this.ngUnsubscribe = new Subject();
    //console.log("INpatient");
    localStorage.removeItem("selectedPatient");
    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.functionsService.logToConsole(this.logindata);

    this.dr_code = this.logindata.doctorCode;
    this.inpatientModelInpatients.accountNo = "none";

    //this.inpatientModelInpatients.drCode = 'MD000175';
    this.inpatientModelInpatients.drCode = this.dr_code;
    this.inpatientModelInpatients.mode = Consta.mode;
    let dr_name = this.logindata.lastName;

    let x: boolean = true;
    /*
    deleted by jessie oct 20 2021
    this.patientService.getAppSettingV2().subscribe((res: any) => {
      Object.keys(res).forEach((key) => {
        var value = res[key];
        Object.keys(value).forEach((lock) => {
          var valuex = value[lock];
          if (key != 'appCode') {
            if (key == 'billingContact') {
              localStorage.setItem(lock, btoa(valuex));
            }

            if (key == 'smsGateway') {
              localStorage.setItem('smsGateway', JSON.stringify(value));
            }
          }
        });
      });
    });*/
    this.functionsService.logToConsole("call patient");

    this.callPatient(this.site);
  }
  hasId(data, id) {
    return data.some(function (el) {
      return el.floor === id;
    });
  }
  //Get using Doctors API
  callPatient(data: any) {
    this.checkInbox();
    this.isFetchDone = false;
    this.doctorService
      .getInPatientV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          if (res == null) {
            res = [];
          }
          if (res.length) {
            this.objecthandler = true;
          } else {
            this.objecthandler = false;
          }
          this.inPatientsDraft = [];
          /* res.forEach((element) => {
            element.last_name = element.last_name.toUpperCase();
            element.middle_name = this.camelCase(element.middle_name);
            element.first_name = this.camelCase(element.first_name);
            this.inPatientsDraft.push(element);
          });*/
          const formatName = (name) => {
            return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
          };

          const formatPatient = (patient) => {
            return {
              ...patient,
              last_name: patient.last_name.toUpperCase(),
              middle_name: formatName(patient.middle_name),
              first_name: formatName(patient.first_name),
            };
          };

          this.inPatientsDraft = res.map(formatPatient);

          this.filterList();
        },
        (error) => {
          this.isFetchDone = true;
          this.functionsService.alert(
            this.messages.ERROR_RETRIEVING_ADMITTED_PATIENTS,
            this.constants.UI_COMPONENT_TEXT__VALUE__OKAY
          );
        },
        () => {
          this.isFetchDone = true;
          this.isUporDown = false;
        }
      );
  }

  //swipe down refresh
  doRefresh(event) {
    setTimeout(() => {
      this.callPatient(this.site);
      //location.reload();
      event.target.complete();
    }, 1000);
  }

  async detail(data: any, allData) {
    localStorage.setItem("pnSelected", JSON.stringify(allData));
    this.data = [];
    /*
    this.functionsService.logToConsole(data);
    this.inPatients.forEach(element => {
       
        if( element.patient_no == data){
          this.data.push(element);
          localStorage.setItem('patientData',btoa(JSON.stringify(this.data)));
        }
    });
    this.functionsService.logToConsole( this.data);
  */

    /*
  this.router.navigate(['menu/in-patients/', data]);
*/
    //this.router.navigate(['menu/in-patients/', data]);

    // this.nav.navigateForward('menu/in-patients/' + data, {
    //   state: {
    //     // ...
    //   },
    // });
    this.nav.navigateForward("menu/in-patients/" + data);

    // this.router.navigate(['in-patient'], {state: {data }});
    /*
    const modal = await this.modalController.create({
      component: ChhAppInPatientModalPage,
      componentProps: { data: data },
      cssClass: "my-custom-modal-inpatient-css",
    });
    modal.present();
    return await modal.onDidDismiss().then((data: any) => {
      this.callPatient(this.site);
    });*/
  }

  locationAction(data: any) {
    this.defaultAccordions = null;

    if (
      data == this.constants.CHH_SITE__CODE__ALL /*"A"*/ ||
      data == this.constants.CHH_SITE__CODE__CEBU /*"C"*/ ||
      data == this.constants.CHH_SITE__CODE__MANDAUE /*"M"*/
    ) {
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
    if (data1 == this.constants.CHH_SITE__VALUE__ALL /*"ALL"*/) {
      this.router.navigate(["/menu/in-patients"]);
    } else if (
      data1 == this.constants.ADMISSION_STATUS__CODE__ADMITTED /*"AC"*/
    ) {
      this.router.navigate(["/menu/in-patients/AC"]);
    } else if (
      data1 == this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE /*"DN"*/
    ) {
      this.router.navigate(["/menu/in-patients/DN"]);
    }
  }
  checkAppearance() {
    this.functionsService.logToConsole("checkAppearance");
    var values = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );
    let dr_username = atob(localStorage.getItem("username"));
    values.forEach((element) => {
      this.functionsService.logToConsole(element.darkmode);
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, "color-theme", "dark");
      } else {
        this.renderer.setAttribute(document.body, "color-theme", "light");
      }
    });

    /* this.patientService
      .getUserSettingsV2(dr_username)
      .subscribe((res: any) => {
        if (Object.keys(res).length >= 1) {
          let data = JSON.stringify(res);
          data = '[' + data + ']';
          let adat = JSON.parse(data);
          adat.forEach((el) => {
            if (typeof el.appearance !== 'undefined') {
              if (el.appearance.darkmode == 1) {
                this.renderer.setAttribute(
                  document.body,
                  'color-theme',
                  'dark'
                );
              } else {
                this.renderer.setAttribute(
                  document.body,
                  'color-theme',
                  'light'
                );
              }
            } else {
              this.renderer.setAttribute(document.body, 'color-theme', 'light');
            }
          });
        }
      });*/
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    // this.ngUnsubscribe.complete();
    this.ngUnsubscribe.complete();
  }
  reverseOrderData;

  up() {
    this.finalFullData = [];
    this.isUporDown = true;
    this.reverseOrderData = "1";
    localStorage.setItem("reverseOrder", this.reverseOrderData);
    //console.log(this.reverseOrderData);
    this.callPatient(this.site);
  }
  down() {
    this.finalFullData = [];
    this.isUporDown = true;
    this.reverseOrderData = "0";
    localStorage.setItem("reverseOrder", this.reverseOrderData);
    //console.log(this.reverseOrderData);
    this.callPatient(this.site);
  }
}
