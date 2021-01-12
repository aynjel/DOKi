import { Component, OnInit, Input } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { ChhAppFeePage } from "../chh-app-fee/chh-app-fee.page";
import { from } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { timeStamp } from "console";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginData } from "../../models/login-data.model";
import { FunctionsService } from "../../shared/functions/functions.service";
import { PatientService } from "src/app/services/patient/patient.service";
import { logWarnings } from "protractor/built/driverProviders";
import { ChemistryPage } from "../chh-app-test/chemistry/chemistry.page";
import { ChhAppBasePage } from "../chh-app-test/chh-app-base/chh-app-base.page";
import { Messages } from "../../shared/messages";

import { ScreenSizeService } from "../../services/screen-size/screen-size.service";
@Component({
  selector: "chh-app-in-patient-modal",
  templateUrl: "./chh-app-in-patient-modal.page.html",
  styleUrls: ["./chh-app-in-patient-modal.page.scss"],
})
export class ChhAppInPatientModalPage implements OnInit {
  public logindata: LoginData;
  @Input() data: any;
  site: any;
  date: any;
  professionalFee: any;
  remarks: any;
  method: any;
  isFetchDone: boolean = false;
  objecthandler: boolean = false;
  coDoctors: any;
  finalDiagnosis: any;
  finalDiagnosis1: any;
  finalDiagnosis2: any;
  admittingDiagnosis: any;
  admittingDiagnosis1: any;
  admittingDiagnosis2: any;
  text: string;
  limit: number = 40;
  truncating = true;
  truncating1 = true;
  daysOfManage: any;
  dateAdmitted: any;
  ionSkeleton: boolean = false;
  currentExamList: any;
  isDesktop: boolean;
  examListSkeleton:boolean = false;
  constructor(
    public modalController: ModalController,
    public _modalController: ModalController,
    public popover: PopoverController,
    private doctorService: DoctorService,
    public alertController: AlertController,
    protected $gaService: GoogleAnalyticsService,
    private authService: AuthService,
    public functionsService: FunctionsService,
    private patientService: PatientService,
    private screensizeService: ScreenSizeService,
    public messages: Messages
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  postData = {
    AdmisisonNo: "string",
    DoctorCode: "string",
    DoctorStatusCode: "string",
    ProfFee: 0,
    DateCreated: "2020-07-01T05:14:48.712Z",
    site: "string",
    CreatedBy: "string",
    Remarks: "string",
    DoctorMobileNumber: "string",
    BillingMobileNumber: "string",
    RoomNumber: "string",
    //  PatientSite: "string",
    SmsGateWay: [],
    OldProfFee: "string",
  };

  coDoctorData = {
    first_name: "string",
    last_name: "string",
    status: "string",
    mobile_no: "string",
    dept_short_desc: "string",
  };

  async modalUpdate(header, message) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: header,
      message: message,
      buttons: [
        {
          text: "Okay",
          handler: () => {
            this.modalController.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

  async examDetails(data: any, site:any) {


      const modal = await this._modalController.create({
        component: ChhAppBasePage,
        componentProps: { ExamDetails: data,Site:site },
        cssClass: "my-custom-modal-inpatient-css",
      });
      modal.present();
        return await modal.onDidDismiss().then((data: any) => {
      });
  
    
    

  }
  getExamList(data) {
    this.ionSkeleton = true;
    var date1 = new Date(this.data.admission_date);
    var seconds1 = date1.getTime() / 1000; //1440516958
    this.currentExamList = [];
    this.patientService.getExamList(data).subscribe(
      (res: any) => {
        this.examListSkeleton = true;
        res.forEach((element) => {
          var date = new Date(element.RequestDateTime);
          var seconds = date.getTime() / 1000; //1440516958
          if (seconds >= seconds1) {
            element.RequestDateTime = new Date(
              element.RequestDateTime
            ).toLocaleDateString();
            element.Exam = this.functionsService.convertToCamelCase(
              element.Exam
            );
            this.currentExamList.push(element);
            // console.log(element.Test_Name + ' | '+new Date(element.RequestDateTime));
            //console.log(new Date(element.RequestDateTime));
          }
        });
        //console.log(this.currentExamList);
      },
      (error) => {
        
        this.examListSkeleton = false;
      },
      () => {
        this.examListSkeleton = false;
      }
    );
  }
  ngOnInit() {
    let d = new Date(this.data.admission_date);
    this.dateAdmitted = d.toUTCString();
    this.$gaService.pageView(
      "/In-Patient/Patient Details",
      "Patient Details Modal"
    );
    let logindata = <LoginData>this.authService.userData$.getValue();
    let dr_name = logindata[0].last_name;
    this.postData.DoctorMobileNumber = logindata[0].mobile_no;
    this.$gaService.event("Patient Information", "User Flow", dr_name);
    this.getExamList(this.data.patient_no);


    /*this.data.admission_date = this.functionsService.explodeDate(
      this.data.admission_date
    );*/
    if (this.data.site == "C") {
      this.site = "CHHC";
      //this.postData.PatientSite = "CEBU";
      this.postData.BillingMobileNumber = atob(localStorage.getItem("C"));
    } else {
      this.site = "CHHM";
      //this.postData.PatientSite = "MANDAUE";
      this.postData.BillingMobileNumber = atob(localStorage.getItem("M"));
    }
    this.postData.RoomNumber = this.data.room_no;
    let smsgateway = JSON.parse(localStorage.getItem("smsGateway"));
    Object.keys(smsgateway).forEach((key) => {
      var value = smsgateway[key];
      let sms =
        '{"settings": "smsGateway","property": "' +
        key +
        '","value": "' +
        value +
        '"}';
      this.postData.SmsGateWay.push(JSON.parse(sms));
    });
    this.professionalFee = this.data.doctor_prof_fee;
    this.remarks = this.data.remarks;

    if (this.data.doctor_prof_fee == null) {
      this.method = "POST";
    } else {
      this.method = "";
    }
    this.postData.AdmisisonNo = this.data.admission_no;
    this.postData.DoctorCode = this.data.dr_code;
    //this.postData.DoctorCode = this.data.dr_code;
    this.postData.DoctorStatusCode = this.data.Doctor_Status_code;
    this.postData.site = this.data.site;
    this.postData.CreatedBy = this.data.dr_code;
    let coDoctors1 = [];
    let coDoctors2 = [];
    let coDoctors3 = [];
    //"status": "Primary Attending Physician"
    this.isFetchDone = false;
    this.doctorService.getCoDoctors(this.data.admission_no).subscribe(
      (res: any) => {
        this.functionsService.logToConsole(res);
        res.forEach((element) => {
          if (element.dr_code == this.data.dr_code) {
            if (element.no_of_days_manage == null) {
              this.daysOfManage = 0;
            } else {
              this.daysOfManage = element.no_of_days_manage;
            }
          }
          //
        });
        if (res.length) {
          this.objecthandler = true;
        } else {
          this.objecthandler = false;
        }
        //this.functionsService.logToConsole(res);
        res.forEach((element) => {
          if (element.status == "Primary Attending Physician") {
            coDoctors1.push(element);
          } else if (element.status == "Co-Manage") {
            coDoctors2.push(element);
          } else {
            coDoctors3.push(element);
          }
        });

        this.coDoctors = coDoctors1.concat(coDoctors2).concat(coDoctors3);
        //this.coDoctors.push(coDoctors2);
      },
      (error) => {
        this.isFetchDone = true;
        this.functionsService.alert("Server Error", "Okay");
      },
      () => {
        this.isFetchDone = true;
      }
    );
    //admitting diagnosis
    this.doctorService.getAdmittingDiagnosis(this.data.admission_no).subscribe(
      (res: any) => {
        /*
        this.admittingDiagnosis = this.functionsService.convertToCamelCase(
          res[0].admitting_diagnosis2
        );
        this.admittingDiagnosis1 = this.functionsService.truncateChar(
          this.functionsService.convertToCamelCase(this.admittingDiagnosis),
          100
        );
        this.admittingDiagnosis2 = this.functionsService.convertToCamelCase(
          this.admittingDiagnosis
        );
*/
        this.admittingDiagnosis = res[0].admitting_diagnosis2.replace(
          /(\r\n|\n|\r)/gm,
          "<br />"
        );
        this.functionsService.logToConsole(
          "admittingDiagnosis : " + this.admittingDiagnosis
        );
        this.admittingDiagnosis1 = this.functionsService.truncateChar(
          res[0].admitting_diagnosis2,
          100
        );
        this.admittingDiagnosis1 = this.admittingDiagnosis1.replace(
          /(\r\n|\n|\r)/gm,
          "<br />"
        );
        this.admittingDiagnosis2 = this.admittingDiagnosis.replace(
          /(,)/gm,
          ",<br />"
        );
        this.functionsService.logToConsole(
          "admittingDiagnosis2 : " + this.admittingDiagnosis2
        );
      },
      (error) => {
        this.isFetchDone = true;
        this.functionsService.alert("Server Error", "Okay");
      },
      () => {
        this.isFetchDone = true;
      }
    );
    //final diagnosis
    if (this.data.admission_status == "DN") {
      this.doctorService.getFinalDiagnosis(this.data.admission_no).subscribe(
        (res: any) => {
          this.finalDiagnosis = res[0].final_diagnosis;
          this.finalDiagnosis1 = this.functionsService.truncateChar(
            this.finalDiagnosis,
            50
          );
          this.finalDiagnosis2 = this.finalDiagnosis
            .replace(/(\r\n|\n|\r)/gm, "")
            .split(".)");
          this.finalDiagnosis2.shift();
          for (let i = 0; i < this.finalDiagnosis2.length - 1; i++) {
            this.finalDiagnosis2[i] = this.finalDiagnosis2[i].substring(
              0,
              this.finalDiagnosis2[i].length - 1
            );
            this.functionsService.logToConsole(this.finalDiagnosis2[i]);
          }
          for (let i = 0; i < this.finalDiagnosis2.length; i++) {
            this.finalDiagnosis2[i] = i + 1 + ".) " + this.finalDiagnosis2[i];
          }
        },
        (error) => {
          this.isFetchDone = true;
          this.functionsService.alert("Server Error", "Okay");
        },
        () => {
          this.isFetchDone = true;
        }
      );
    }
  }
  dateChanged(data1: any) {
    //  this.functionsService.logToConsole("changed data: "+data1);
  }
  // Prof Fee Pop Over
  async detail(data: any) {
    //this.functionsService.logToConsole("Detail : " + this.method);

    if (this.data.doctor_prof_fee == null) {
      this.method = "POST";
    } else {
      this.method = "";
    }
    const popover = await this.popover.create({
      component: ChhAppFeePage,
      showBackdrop: true,
      translucent: true,
      componentProps: {
        professionalFee: this.professionalFee,
        remarks: this.remarks,
        method: this.method,
      },
    });
    popover.present();
    return popover.onDidDismiss().then((data: any) => {
      if (data) {
        this.professionalFee = data.data.professionalFee;
        this.remarks = data.data.remarks;
        this.postData.Remarks = data.data.remarks;
        this.postData.DateCreated = this.functionsService.getSystemDateTime();
        let x = data.data.method;
        this.postData.ProfFee = data.data.professionalFee;
        if (x == "POST") {
          this.doctorService.insertPF(this.postData).subscribe((res: any) => {
            if (res == true) {
              this.professionalFee = data.data.professionalFee;
              this.remarks = data.data.remarks;
              this.postData.ProfFee = data.data.professionalFee;
              this.postData.Remarks = data.data.remarks;
              this.postData.DateCreated = this.functionsService.getSystemDateTime();
              this.data.doctor_prof_fee = data.data.professionalFee;
              this.modalUpdate(
                "SUCCESS",
                "Thank you, Doc! You have successfully SAVED your Professional Fee."
              );
            } else {
              this.functionsService.alert(
                "SAVING of Professional Fee was Unsuccessful",
                "Okay"
              );
            }
          });
        } else if (x == "PUT") {
          this.postData.OldProfFee = this.data.doctor_prof_fee;
          this.doctorService.updatePF(this.postData).subscribe((res: any) => {
            if (res == true) {
              this.professionalFee = data.data.professionalFee;
              this.remarks = data.data.remarks;
              this.postData.ProfFee = data.data.professionalFee;
              this.postData.Remarks = data.data.remarks;
              this.postData.DateCreated = this.functionsService.getSystemDateTime();
              this.data.doctor_prof_fee = data.data.professionalFee;
              this.modalUpdate(
                "SUCCESS",
                "Successfully UPDATED your Professional Fee."
              );
            } else {
              this.functionsService.alert(
                "UPDATING of Professional Fee was Unsuccessful",
                "Okay"
              );
            }
          });
        } else if (x == "DELETE") {
          this.functionsService.logToConsole("DELETE: " + this.postData);
          this.doctorService
            .DeletePf(
              this.postData.AdmisisonNo,
              this.postData.DoctorStatusCode,
              this.postData.DoctorCode
            )
            .subscribe((res: any) => {
              if (res == true) {
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.postData.ProfFee = data.data.professionalFee;
                this.postData.Remarks = data.data.remarks;
                this.postData.DateCreated = this.functionsService.getSystemDateTime();
                this.data.doctor_prof_fee = data.data.professionalFee;
                this.modalUpdate(
                  "SUCCESS",
                  "Successfully DELETED your Professional Fee."
                );
              } else {
                this.functionsService.alert(
                  "DELETING of Professional Fee was Unsuccessful",
                  "Okay"
                );
              }
            });
        }
      }
    });
  }
  /* async closeModal() {
    await this.modalController.dismiss();
  } */

  /* getDateTime() {
    let xx = new Date();
    let H = this.addZeroBefore(xx.getHours());
    let i = this.addZeroBefore(xx.getMinutes());
    let s = this.addZeroBefore(xx.getSeconds());
    let v = xx.getMilliseconds();

    return this.functionsService.getSystemDate() + "T" + H + ":" + i + ":" + s + "." + v + "Z";
  } */

  /*  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  } */

  /*  getDoctorStatusCode(data: string) {
    if (data == "Co-Manage") return "CM";
    if (data == "Primary Attending Physician") return "AP";
    if (data == "Consult") return "CO";
    if (data == "HMO") return "HC";
  } */

  /*   addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  } */

  /* explodeDate(data: any) {
    let myarr = data.split("T");
    if (myarr[1]) {
      let myarr2 = myarr[1].split(".");
      return myarr[0] + " | " + myarr2[0];
    }
<<<<<<< HEAD:src/app/components/inpatientmodal/inpatientmodal.page.ts
  }
  truncateChar(text: string, limit:any): string {
    let charlimit = limit;
    if(!text || text.length <= charlimit )
    {
        return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
    return shortened;
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
=======
  } */
}
