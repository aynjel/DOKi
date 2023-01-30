import { Component, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, NavigationCancel } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { OnlineResultService } from "src/app/services/onlie-result/online-result.service";
import { ScreenSizeService } from "../../../services/screen-size/screen-size.service";
import { FunctionsService } from "../../../shared/functions/functions.service";
import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { ExamResultsModalComponent } from "../../../chh-web-components/exam-results-modal/exam-results-modal.component";

@Component({
  selector: "app-diagnostic-results",
  templateUrl: "./diagnostic-results.page.html",
  styleUrls: ["./diagnostic-results.page.scss"],
})
export class DiagnosticResultsPage implements OnInit {
  private ngUnsubscribe = new Subject();
  patientId: any;
  patientInfo: any;
  isDesktop: boolean;
  progessNotes: any = [];
  progessNotesTemp: any = [];
  progressNotesIsEmpty: boolean = false;
  progressNotesIsNotReady: boolean = false;
  dateToday: any;
  dateAdmitted;
  user_created: any;
  activeDays: any = [];
  birthday: any;
  age: any;
  constructor(
    private navCtrl: NavController,
    private screensizeService: ScreenSizeService,
    private renderer: Renderer2,
    private funcServ: FunctionsService,
    private activatedRoute: ActivatedRoute,
    private orService: OnlineResultService,
    private modalCtrl: ModalController
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
    this.checkAppearance();
  }
  checkAppearance() {
    this.renderer.setAttribute(document.body, "color-theme", "light");
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  admission_status;
  patientDetailfromApi_from;
  patientDetailfromApi_to;
  data;
  is_pwd;
  is_philhealth_membership;
  is_senior;
  isVatDisabled;
  InsuranceVat;
  PersonalPhilhealthVat;
  PhilhealthVat;
  patient_name;
  patient_id;
  dischargeNotice;
  ngOnInit() {
    this.ngUnsubscribe = new Subject();
    this.patient_id = this.activatedRoute.snapshot.params.id;

    this.data = JSON.parse(atob(localStorage.getItem("selectedPatient")));
    //console.log(this.data);

    this.checkAppearance();
    this.dateAdmitted = this.data[0].admission_date;
    //console.log(this.dateAdmitted);

    this.dischargeNotice = this.data[0].forDischargeDateTime;
    ////////console.log(this.data[0].philhealth_membership);
    this.is_philhealth_membership = this.data[0].philhealth_membership;
    this.is_pwd = this.data[0].is_pwd;
    this.is_senior = this.data[0].is_senior;
    this.admission_status = atob(localStorage.getItem("admission_status"));
    this.patientDetailfromApi_from = atob(localStorage.getItem("Api_from"));
    this.patientDetailfromApi_to = atob(localStorage.getItem("Api_to"));

    this.dateToday = this.funcServ.getDateTodayMMDDYYYY();
    this.user_created = atob(localStorage.getItem("username"));
    this.patientId = this.activatedRoute.snapshot.params.id;
    this.patientInfo = JSON.parse(
      atob(localStorage.getItem("selectedPatient"))
    );
    this.patientId = this.patientInfo[0].admission_no;
    //console.log(this.patientInfo);

    this.birthday = this.funcServ.convertDatetoMMDDYYYY(
      this.patientInfo[0].birthdate
    );
    this.age = this.funcServ.calculateAge(
      this.birthday,
      this.funcServ.getDateTodayMMDDYYYY()
    );
    this.getInterval();
    this.Search("laboratory-by-account-no");
  }
  back() {
    this.navCtrl.back();
    //this.router.navigate(['menu/patient/' + this.patientId]);
  }
  selected;
  request_type;
  isLoading;
  resultListFull;
  resultList;
  apiRequest: any;
  Search(data) {
    if (data == "cardio-by-account-no") {
      this.request_type = "cardiology";
    }
    if (data == "endoscopy-by-account-no") {
      this.request_type = "endoscopy";
    }
    if (data == "neurophysio-by-account-no") {
      this.request_type = "neurophysio";
    }
    if (data == "laboratory-by-account-no") {
      this.request_type = "lab";
    }
    if (data == "pulmonary-by-account-no") {
      this.request_type = "pulmonary";
    }
    if (data == "radiology-by-account-no") {
      this.request_type = "radiology";
    }
    this.selected = data;
    this.getResults(data);
  }
  getResults(link) {
    if (this.apiRequest != undefined) {
      this.apiRequest.unsubscribe();
    }

    this.isLoading = true;
    let result = {
      accountNo: "string",
    };
    let resultList;
    //console.log(this.patientInfo);

    result.accountNo = this.patientInfo[0].admission_no;
    //console.log(result);

    this.apiRequest = this.orService
      .getAllByAccountNoSet(result, link)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        complete: () => {
          this.processResultList(resultList);
          this.isLoading = false;
          this.apiRequest.unsubscribe();
        },
        error: (error) => {
          this.resultListFull = [];
          this.resultList = null;
          this.isLoading = false;
          this.apiRequest.unsubscribe();
        },
        next: (res: any) => {
          resultList = res.data;
          let interval;

          resultList.forEach((element) => {
            let index = this.intervalData.findIndex(function (item, i) {
              return item.subclass === element.subclass;
            });

            if (index <= 0) {
              element["resultInMinutes"] = 1;
              element["interval"] = 0;
            } else {
              // this.intervalData[index];
              interval = this.intervalData[index].onlineTimeTrigger;

              let release_Date = new Date(
                this.funcServ.getDateFullData(element.release_Date)
              );

              var dateTimeNow = new Date(this.funcServ.getDateFull());

              var difference = dateTimeNow.getTime() - release_Date.getTime(); // This will give difference in milliseconds

              var resultInMinutes = Math.round(difference / 60000);

              element["resultInMinutes"] = resultInMinutes;
              element["interval"] = parseInt(interval);
            }
          });
          //console.log(resultList);

          this.resultListFull = resultList;
        },
      });
  }
  processResultList(data) {
    //console.log("processResultList");

    this.resultList = [];
    data.forEach((el) => {
      el.date_exam_c = this.funcServ.getMmDdYyyy(el.date_Exam);
      this.resultList.push(el);
    });
    //this.resultList = this.resultListFull.slice(0, 10);
  }
  intervalData = [];
  getInterval() {
    this.orService
      .post("/gw/pxi/results/get-subclass", "")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        complete: () => {},
        error: (error) => {
          //////console.log(error);
        },
        next: (data: any) => {
          this.intervalData = data;
          //////console.log(data);
        },
      });
  }
  async openModalWithComponent(x) {
    let requestType;
    if (this.request_type == "lab") {
      requestType = this.request_type + "-" + x.exam.toLowerCase();
      if (requestType == "lab-molecular pathology") {
        requestType = "lab-molecular-pathology";
      }
      if (requestType == "lab-hematology-others") {
        requestType = "lab-hematology";
      }
      if (requestType == "lab-culture-sensitivity") {
        requestType = "lab-microbiology";
      }
      if (requestType == "lab-clinical microscopy") {
        requestType = "lab-microscopy";
      }
      //console.log(requestType);
    } else {
      requestType = this.request_type;
    }
    const modal = await this.modalCtrl.create({
      component: ExamResultsModalComponent,
      componentProps: { ExamDetails: x, requestType: requestType },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
