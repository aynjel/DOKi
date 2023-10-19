import { Component, OnInit } from "@angular/core";
import { Constants } from "../../../shared/constants";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginResponseModelv3 } from "src/app/models/doctor";
@Component({
  selector: "app-search-medicalabstract",
  templateUrl: "./search-medicalabstract.page.html",
  styleUrls: ["./search-medicalabstract.page.scss"],
})
export class SearchMedicalabstractPage implements OnInit {
  constructor(
    public constants: Constants,
    private doctorService: DoctorService,
    private router: Router,
    private authService: AuthService
  ) {}
  defaultAccordions;
  site = "C";
  inPatients;
  finalFullData;
  inPatientsDraft;
  inPatientsDraft1;
  searchBar;
  ngOnInit() {}
  loginResponseModelv3;
  ionViewWillEnter() {
    this.loginResponseModelv3 = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    //console.log(this.loginResponseModelv3.doctorCode);
    this.getMEdicalAbstractList();
  }
  private ngUnsubscribe = new Subject();
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
  medicalAbstractList;
  doRefresh(event) {
    setTimeout(() => {
      this.medicalAbstractList = [];
      this.inPatientsDraft = [];
      this.inPatientsDraft1 = [];
      this.getMEdicalAbstractList();
      //location.reload();
      event.target.complete();
    }, 1000);
  }
  isSearching: boolean = false;
  getMEdicalAbstractList() {
    let xxyyzz = {
      account_no: "string",
    };
    xxyyzz.account_no = this.loginResponseModelv3.doctorCode;
    this.isSearching = true;
    //console.log(this.loginResponseModelv3.doctorCode);
    //http://10.151.12.120:7224/api/v3/MedicalAbstract/MedicalAbstractList
    this.doctorService
      .postDI("gw/MedicalAbstract/MedicalAbstractDOKiList", xxyyzz)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        complete: () => {
          this.isSearching = false;
          //console.log("asdasd");
          this.changeMode();
        },
        error: (error) => {
          this.isSearching = false;
          //console.log(error);
        },
        next: (data: any) => {
          this.isSearching = false;
          //console.log("asdasd");

          //console.log(data);
          this.medicalAbstractList = data;
          this.inPatientsDraft = data;
          this.inPatientsDraft1 = data;
        },
      });
  }
  filterList() {
    //console.log(this.inPatientsDraft);

    this.inPatients = [];
    this.finalFullData = [];
    this.site = localStorage.getItem("siteSelected");
    /*if (this.site === this.constants.CHH_SITE__CODE__ALL) {
      this.inPatients = this.inPatientsDraft;
    } else if (this.site === this.constants.CHH_SITE__CODE__CEBU) {
      this.inPatients = this.inPatientsDraft.filter(
        (x) => x.site === this.constants.CHH_SITE__CODE__CEBU
      );
    } else if (this.site === this.constants.CHH_SITE__CODE__MANDAUE) {
      this.inPatients = this.inPatientsDraft.filter(
        (x) => x.site === this.constants.CHH_SITE__CODE__MANDAUE
      );
    }*/

    ////////console.logthis.inPatients);

    if (this.searchBar) {
      //console.log(this.searchBar);
      //console.log(this.inPatientsDraft1);

      this.medicalAbstractList = [];

      this.medicalAbstractList = this.inPatientsDraft1.filter((e) => {
        ////////console.loge.room_no.toLowerCase(), "|", this.searchBar.toLowerCase());
        //console.log(e.name);
        return e.name.toLowerCase().includes(this.searchBar.toLowerCase());
        /* return (
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
        );*/
      });
      //console.log(this.inPatients);
    } else {
      this.medicalAbstractList = this.inPatientsDraft1;
    }
    ////////console.log(this.inPatients);

    let floorStack = [];
    let data;
    let xyz;
    let reference;

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
    });*/
    ////console.log(this.finalFullData);
  }
  detail(x, y, z) {
    let zctr = z.ctr;
    let data = "menu/inbox/sign-medabs/" + x + "/" + y + "/" + zctr;
    this.router.navigate([data]).then(() => {
      // window.location.reload();
    });
  }
  selected = "F";
  pendingApprovalCount;
  prelimCount;
  changeMode() {
    //console.log(this.inPatientsDraft1);
    /*   this.medicalAbstractList = this.inPatientsDraft1.filter(
      (element) => element.abstract_Status == this.selected
    ); */
  }
}
