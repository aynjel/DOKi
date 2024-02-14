import { Component, Renderer2, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { Consta } from "../config/auth-constants";

import { DoctorService } from "../services/doctor/doctor.service";
import { MenuController, NavController } from "@ionic/angular";
import { ScreenSizeService } from "../services/screen-size/screen-size.service";
import { InPatientData } from "../models/in-patient.model";
import { FunctionsService } from "../shared/functions/functions.service";
import { Constants } from "../shared/constants";
import { Messages } from "../shared/messages";
import {
  ErpatientModelErpatients,
  LoginResponseModelv3,
} from "../models/doctor";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { takeUntil } from "rxjs/operators";
import { filter } from "rxjs/operators";
import { NavigationEnd } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: 'app-tab-er-patients',
  templateUrl: './tab-er-patients.page.html',
  styleUrls: ['./tab-er-patients.page.scss'],
})
export class TabErPatientsPage implements OnInit {

  isUporDown = false;
  erpatientModelErpatients = new ErpatientModelErpatients();
  logindata: LoginResponseModelv3;
  inPatientData: InPatientData;
  isDesktop: boolean;
  isFetchDone = false;
  dr_code = "";
  erPatients = [];
  erPatientsDraft: any;
  erPatientsDraft1: any;
  site = this.constants.CHH_SITE__CODE__CEBU; //"A";
  searchBar: string;
  admittedOrDischarge = this.constants.ADMISSION_STATUS_SELECTION__VALUE__ALL; //"ALL";
  admittedOrDischargeLabel = "";
  route: string;
  objecthandler = false;
  data = [];
  isNotification: boolean;
  finalFullData = [];
  defaultAccordions: string;
  reverseOrderData: string;

  private ngUnsubscribe = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorService: DoctorService,
    private screensizeService: ScreenSizeService,
    public functionsService: FunctionsService,
    private renderer: Renderer2,
    public constants: Constants,
    public messages: Messages,
    public nav: NavController,
    private menu: MenuController
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
      
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (event: NavigationEnd) => {
          if (event.url == "/menu/er-patients") {
            console.log(event.url);
            this.admittedOrDischarge = this.constants.CHH_SITE__VALUE__ALL;
            this.admittedOrDischargeLabel = "";
          } else if (event.url == "/menu/er-patients/RE") {
            console.log(event.url);
            this.admittedOrDischarge =
              this.constants.ADMISSION_STATUS__CODE__FOR_REGISTERED;
            this.admittedOrDischargeLabel =
              "(" +
              this.functionsService.convertAllFirstLetterToUpperCase(
                this.constants.ADMISSION_STATUS__VALUE__ADMITTED
              ) +
              ")";
          } else if (event.url == "/menu/er-patients/ED") {
            this.admittedOrDischarge =
              this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE_ED;
            this.admittedOrDischargeLabel = "(for Discharge)";
          }
        },
      });

    const xdata = localStorage.getItem("reverseOrder");
    if (xdata == null) {
      localStorage.setItem("reverseOrder", "1");
    }
    this.reverseOrderData = localStorage.getItem("reverseOrder");
    this.checkAppearance();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.routerState.snapshot.url.includes("/menu/er-patients")) {
          this.callPatient();
        }
        // Perform any necessary actions after navigation, e.g., refresh data
      });
  }

  //Get using Doctors API
  callPatient(): void {
    this.checkInbox();
    this.isFetchDone = false;
    this.doctorService
      .getErPatientV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          if (res == null) return res = [];
          if (res.length) {
            this.objecthandler = true;
          } else {
            this.objecthandler = false;
          }
          this.erPatientsDraft = [];
          const formatName = (name: string) => {
            return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
          };

          this.erPatientsDraft = res.map((patient) => {
            return {
              ...patient,
              last_name: patient.last_name.toUpperCase(),
              middle_name: formatName(patient.middle_name),
              first_name: formatName(patient.first_name),
            };
          });
          this.erPatientsDraft = res;

          this.filterList();
        },
        error: (error) => {
          this.isFetchDone = true;
          this.functionsService.alert(
            this.messages.ERROR_RETRIEVING_ADMITTED_PATIENTS,
            this.constants.UI_COMPONENT_TEXT__VALUE__OKAY
          );
          console.log(error);
        },
        complete: () => {
          this.isFetchDone = true;
          this.isUporDown = false;
        },
      });
  }

  filterList(): void {
    // console.log(this.erPatientsDraft);
    if (this.site == this.constants.CHH_SITE__CODE__ALL /*"A"*/) {
      this.erPatients = [];
      this.erPatients = this.erPatientsDraft;
      this.finalFullData = [];
    } else {
      this.erPatients = [];
      this.finalFullData = [];

      if (this.site == this.constants.CHH_SITE__CODE__CEBU) {
        this.erPatients = this.erPatientsDraft.filter(
          (x) => x.site == this.constants.CHH_SITE__CODE__CEBU
        );
      } else if (this.site == this.constants.CHH_SITE__CODE__MANDAUE) {
        this.erPatients = this.erPatientsDraft.filter(
          (x) => x.site == this.constants.CHH_SITE__CODE__MANDAUE
        );
      }
    }
    this.erPatientsDraft1 = this.erPatients;
    
    const roomNoList = [...new Set(this.erPatients.map((d) => d.room_no))];
    const roomNoListWithPatientData = roomNoList.map((roomNo) => {
      return {
        room_no: roomNo,
        data: this.erPatients.filter((patient) => patient.room_no === roomNo),
      };
    });
    
    if (this.searchBar) {
      roomNoListWithPatientData.forEach((room) => {
        room.data = room.data.filter((patient) => {
          return (
            patient.last_name
              .toLowerCase()
              .includes(this.searchBar.toLowerCase()) ||
            patient.first_name
              .toLowerCase()
              .includes(this.searchBar.toLowerCase()) ||
            patient.middle_name
              .toLowerCase()
              .includes(this.searchBar.toLowerCase()) ||
            patient.patient_no
              .toLowerCase()
              .includes(this.searchBar.toLowerCase())
          );
        });
      });
    }

    if (this.isUporDown) {
      roomNoListWithPatientData.forEach((room) => {
        room.data = room.data.sort((a, b) => {
          if (this.reverseOrderData == "1") {
            if (a.admission_date > b.admission_date) {
              return -1;
            } else if (a.admission_date < b.admission_date) {
              return 1;
            } else {
              return 0;
            }
          } else {
            if (a.admission_date < b.admission_date) {
              return -1;
            } else if (a.admission_date > b.admission_date) {
              return 1;
            } else {
              return 0;
            }
          }
        });
      });
    }

    if (this.admittedOrDischarge != this.constants.CHH_SITE__VALUE__ALL /*"ALL"*/) {
      roomNoListWithPatientData.forEach((room) => {
        room.data = room.data.filter((patient) => {
          return patient.admission_status === this.admittedOrDischarge;
        });
      });
    }

    this.finalFullData = roomNoListWithPatientData;
    /*check if ALL - ADMITTED - FOR DISCHARGE*/
    // if (
    //   this.admittedOrDischarge != this.constants.CHH_SITE__VALUE__ALL /*"ALL"*/
    // ) {
    //   let verifier = false; //to verify if naa ba jud na check na value RE or ED
    //   let sampleerPatients1 = [];
      
    //   if (
    //     this.admittedOrDischarge ==
    //     this.constants.ADMISSION_STATUS__CODE__FOR_REGISTERED
    //   ) {
    //     verifier = true;

    //     sampleerPatients1 = this.erPatients.filter(
    //       (x) =>
    //         x.admission_status ==
    //         this.constants.ADMISSION_STATUS__CODE__FOR_REGISTERED
    //     );
    //   } else if (
    //     this.admittedOrDischarge ==
    //     this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE_ED
    //   ) {
    //     verifier = true;

    //     sampleerPatients1 = this.erPatients.filter(
    //       (x) =>
    //         x.admission_status ==
    //         this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE_ED
    //     );
    //   }
    //   if (verifier) {
    //     this.erPatients = [];
    //     this.erPatients = sampleerPatients1;
    //   }
    // }

    // const floorStack = [];
    // let data;
    // let xyz;
    // let reference;
    
    // if (this.reverseOrderData == "1") {
    //   if (this.site == "C") {
    //     reference = this.constants.cebuRooms;
    //   } else {
    //     reference = this.constants.mandaueRooms;
    //   }
    // } else {
    //   if (this.site == "C") {
    //     reference = this.constants.cebuRoomsReverse;
    //   } else {
    //     reference = this.constants.mandaueRoomsReverse;
    //   }
    // }

    // let stack = [...new Set(this.erPatients.map((d) => d.room_no))];
    // stack = this.sortOrder(reference, stack);
    // console.log(stack);
    // stack.forEach((element) => {
    //   if (this.defaultAccordions == null) {
    //     this.defaultAccordions = element;
    //   }
    //   floorStack.push({ room: element });
    // });
    // floorStack.forEach((fs) => {
    //   data = this.erPatients.filter((x) => x.room_no == fs.room);
    //   let designation;
    //   if (data.length == 1) {
    //     designation = "Patient";
    //   } else {
    //     designation = "Patients";
    //   }
    //   xyz = {
    //     room: fs.room,
    //     designation: designation,
    //     data: data,
    //   };
    //   this.finalFullData.push(xyz);
    // });
  }

  checkInbox(): void {
    const data = {
      dt_from: this.functionsService.getDateYYYYMMDD(9999) + "T00:00:00.000Z",
      dt_to: this.functionsService.getDateYYYYMMDD() + "T00:00:00.000Z",
    };
    let jsonResponse = null;
    this.doctorService
      .getPendingApproval(data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res: any) => {
          jsonResponse = res;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
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
      });
  }

  sortOrder(getOrder: any, getArr: any): any {
    const arr = [];
    getOrder.forEach((element) => {
      if (getArr.includes(element)) {
        arr.push(element);
      }
    });
    return arr;
  }

  //Fired when the component routing to is about to animate into view.
  ionViewWillEnter(): void {
    this.ngUnsubscribe = new Subject();
    localStorage.removeItem("selectedPatient");
    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.functionsService.logToConsole(this.logindata);

    this.dr_code = this.logindata.doctorCode;
    this.erpatientModelErpatients.accountNo = "none";

    this.erpatientModelErpatients.drCode = this.dr_code;
    this.erpatientModelErpatients.mode = Consta.mode;
  }

  hasId(data, id): void {
    return data.some(function (el) {
      return el.floor === id;
    });
  }

  doRefresh(event): void {
    setTimeout(() => {
      this.callPatient();
      event.target.complete();
    }, 1000);
  }

  async detail(data: any, allData): Promise<void> {
    localStorage.setItem("pnSelected", JSON.stringify(allData));
    this.data = [];
    this.nav.navigateForward("menu/er-patients/" + data);
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

  checkAppearance() {
    this.functionsService.logToConsole("checkAppearance");
    const values = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );
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
    this.ngUnsubscribe.complete();
  }

  toggleMenu(): void {
    this.menu.toggle(); //Add this method to your button click function
  }

  up(): void {
    this.finalFullData = [];
    this.isUporDown = true;
    this.reverseOrderData = "1";
    localStorage.setItem("reverseOrder", this.reverseOrderData);
    this.callPatient();
  }

  down(): void {
    this.finalFullData = [];
    this.isUporDown = true;
    this.reverseOrderData = "0";
    localStorage.setItem("reverseOrder", this.reverseOrderData);
    this.callPatient();
  }

  camelCase(str: string): string {
    const splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  changeErpatientMode(a: string): void {
    localStorage.setItem("navigateErpatient", a);
    if (a == "ALL") {
      this.admittedOrDischarge = this.constants.CHH_SITE__VALUE__ALL; //"ALL";
      this.admittedOrDischargeLabel = "";
    } else if (a == "RE") {
      this.admittedOrDischarge =
        this.constants.ADMISSION_STATUS__CODE__FOR_REGISTERED; //"RE";
      this.admittedOrDischargeLabel =
        "(" +
        this.functionsService.convertAllFirstLetterToUpperCase(
          this.constants.ADMISSION_STATUS__VALUE__FOR_REGISTERED
        ) +
        ")"; //"(Admitted)";
    } else if (a == "ED") {
      this.admittedOrDischarge =
        this.constants.ADMISSION_STATUS__CODE__FOR_DISCHARGE_ED; //"ED";
      this.admittedOrDischargeLabel = "(For Discharge)";
    }
    this.callPatient();
  }
}
