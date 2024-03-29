import { Component, OnInit, Renderer2, ViewChild } from "@angular/core";
import { IonContent, NavController } from "@ionic/angular";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { FunctionsService } from "src/app/shared/functions/functions.service";
import { Messages } from "../../../shared/messages";
import { Constants } from "../../../shared/constants";
import { Router } from "@angular/router";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";
import { NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-patient-history",
  templateUrl: "./patient-history.page.html",
  styleUrls: ["./patient-history.page.scss"],
})
export class PatientHistoryPage implements OnInit {
  isDesktop: boolean;
  private ngUnsubscribe = new Subject();
  constructor(
    private navCtrl: NavController,
    private doctorService: DoctorService,
    private functionsService: FunctionsService,
    public constants: Constants,
    public messages: Messages,
    public router: Router,
    public screensizeService: ScreenSizeService,
    public renderer: Renderer2
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
  back() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.callPatient("a");
  }
  ngOnInit() {
    this.site = localStorage.getItem("siteSelected");
    localStorage.setItem("fromurl", "PatientHistory");
    if (localStorage.getItem("siteSelected")) {
    } else {
      localStorage.setItem("siteSelected", "C");
    }
    this.callPatient("a");
    this.checkAppearance();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.routerState.snapshot.url.includes("patient-history")) {
          this.callPatient("a");
          if (localStorage.getItem("siteSelected")) {
          } else {
            localStorage.setItem("siteSelected", "C");
          }
        }
      });
  }
  checkAppearance() {
    var values = JSON.parse(
      "[" + atob(localStorage.getItem("user_settings")) + "]"
    );
    let dr_username = atob(localStorage.getItem("username"));
    values.forEach((element) => {
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, "color-theme", "dark");
      } else {
        this.renderer.setAttribute(document.body, "color-theme", "light");
      }
    });
  }
  isFetchDone;
  objecthandler;
  inPatientsDraft;
  isUporDown;
  inPatients;
  apiRequest: any = "";
  callPatient(data: any) {
    if (this.apiRequest != "") {
      this.apiRequest.unsubscribe();
    }
    this.apiRequest = this.isFetchDone = false;
    this.doctorService
      .getInPatientHistoryV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          ////console.log(res);
          if (res == null) {
            res = [];
          }
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
  finalFullData;
  searchBar;
  inPatientsDraft1;
  admittedOrDischarge;
  reverseOrderData;
  sortedData;
  filterList() {
    //////////console.logthis.inPatientsDraft);

    this.inPatients = [];
    this.finalFullData = [];
    this.sortedData = [];
    this.site = localStorage.getItem("siteSelected");
    if (this.site === this.constants.CHH_SITE__CODE__ALL) {
      this.inPatients = this.inPatientsDraft;
    } else if (this.site === this.constants.CHH_SITE__CODE__CEBU) {
      this.inPatients = this.inPatientsDraft.filter(
        (x) => x.site === this.constants.CHH_SITE__CODE__CEBU
      );
    } else if (this.site === this.constants.CHH_SITE__CODE__MANDAUE) {
      this.inPatients = this.inPatientsDraft.filter(
        (x) => x.site === this.constants.CHH_SITE__CODE__MANDAUE
      );
    }

    //////////console.logthis.inPatients);

    this.inPatientsDraft1 = this.inPatients;
    if (this.searchBar) {
      this.inPatients = [];

      this.inPatients = this.inPatientsDraft1.filter((e) => {
        //////////console.loge.room_no.toLowerCase(), "|", this.searchBar.toLowerCase());

        return (
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
      });
    }
    ////////console.log(this.inPatients);

    let floorStack = [];
    let data;
    let xyz;
    let reference;
    ////////////console.logthis.reverseOrderData);
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

    /*let stack = [...new Set(this.inPatients.map((d) => d.floor_desc))];
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
    });*/ //console.log(this.inPatients);

    this.sortedData = this.inPatients.sort((a, b) => {
      const lastNameA = a.last_name.toUpperCase();
      const firstNameA = a.first_name.toUpperCase();
      const lastNameB = b.last_name.toUpperCase();
      const firstNameB = b.first_name.toUpperCase();

      if (lastNameA !== lastNameB) {
        return lastNameA < lastNameB ? -1 : 1;
      } else {
        return firstNameA < firstNameB ? -1 : 1;
      }
    });

    /*  this.sortedData = this.inPatients.sort((a, b) => {
      if (!a.discharged_date && !b.discharged_date) {
        return 0; // Both dates are blank, so they are considered equal
      } else if (!a.discharged_date) {
        return -1; // a has a blank discharged_date, so it should come before b
      } else if (!b.discharged_date) {
        return 1; // b has a blank discharged_date, so it should come before a
      } else {
        // Sort by discharged_date in descending order
        return (
          new Date(b.discharged_date).getTime() -
          new Date(a.discharged_date).getTime()
        );
      }
    });*/

    this.inPatients = this.sortedData.slice(0, 5);

    this.scrollToTop();
  }
  refreshcounter: any = 1;
  loadData(event) {
    this.refreshcounter++;
    setTimeout(() => {
      this.inPatients = this.inPatients.concat(
        this.sortedData.slice(
          this.refreshcounter * 5 - 5,
          this.refreshcounter * 5
        )
      );
      //console.log(this.refreshcounter * 5 - 5, this.refreshcounter * 5);

      //Hide Infinite List Loader on Complete
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 400);
  }
  onIonInfinite(data) {}
  defaultAccordions;
  site = "C";
  locationAction(data: any) {
    ////console.log(data);
    localStorage.setItem("siteSelected", data);
    this.defaultAccordions = null;

    if (
      data == this.constants.CHH_SITE__CODE__ALL /*"A"*/ ||
      data == this.constants.CHH_SITE__CODE__CEBU /*"C"*/ ||
      data == this.constants.CHH_SITE__CODE__MANDAUE /*"M"*/
    ) {
      this.site = data;
    }
    this.filterList();
  }
  sortOrder(getOrder, getArr) {
    return getOrder.filter(function (order) {
      return getArr.some(function (list) {
        return order === list;
      });
    });
  }

  up() {
    this.finalFullData = [];
    this.isUporDown = true;
    this.reverseOrderData = "1";
    localStorage.setItem("reverseOrder", this.reverseOrderData);
    ////////////console.logthis.reverseOrderData);
    this.callPatient(this.site);
  }
  down() {
    this.finalFullData = [];
    this.isUporDown = true;
    this.reverseOrderData = "0";
    localStorage.setItem("reverseOrder", this.reverseOrderData);
    ////////////console.logthis.reverseOrderData);
    this.callPatient(this.site);
  }
  doRefresh(event) {
    this.refreshcounter = 1;
    setTimeout(() => {
      this.callPatient(this.site);
      //location.reload();
      event.target.complete();
    }, 1000);
  }
  data;
  async detail(data: any, allData: any) {
    localStorage.setItem("fromurl", "PatientHistory");
    localStorage.setItem("doctor_Status_code", allData.doctor_Status_code);
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
    this.router.navigate(["/menu/in-patients/" + data + "/progressnotes/"]);

    //this.router.navigate(['menu/in-patients/', data]);

    // this.nav.navigateForward('menu/in-patients/' + data, {
    //   state: {
    //     // ...
    //   },
    // });
    //  this.nav.navigateForward("menu/in-patients/" + data);

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
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  @ViewChild(IonContent) content: IonContent;
  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }
  handleScrollStart() {}
  handleScroll(event) {}
  handleScrollEnd() {}
}
