import { Component, OnInit, Input } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { ChhAppFeePage } from "../chh-app-fee/chh-app-fee.page";
import { from } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { timeStamp } from "console";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { FunctionsService } from "../../shared/functions/functions.service";

@Component({
  selector: "chh-app-in-patient-modal",
  templateUrl: "./chh-app-in-patient-modal.page.html",
  styleUrls: ["./chh-app-in-patient-modal.page.scss"],
})

export class ChhAppInPatientModalPage implements OnInit {
  @Input() data: any;
  site: any;
  date: any;
  professionalFee: any;
  remarks: any;
  method: any;
  isFetchDone: boolean = false;
  objecthandler: boolean = false;
  coDoctors: any;
  constructor(
    private modalController: ModalController,
    private popover: PopoverController,
    private doctorService: DoctorService,
    //public alertController: AlertController,
    public functionsService: FunctionsService,
    protected $gaService: GoogleAnalyticsService
  ) {}

  postData = {
    AdmisisonNo: "string",
    DoctorCode: "string",
    DoctorStatusCode: "string",
    ProfFee: 0,
    DateCreated: "2020-07-01T05:14:48.712Z",
    site: "string",
    CreatedBy: "string",
    Remarks: "string",
  };

  coDoctorData = {
    first_name: "string",
    last_name: "string",
    status: "string",
    mobile_no: "string",
    dept_short_desc: "string",
  };

  ngOnInit() {
    this.$gaService.pageView(
      "/In-Patient/Patient Details",
      "Patient Details Modal"
    );
    this.data.admission_date = this.explodeDate(this.data.admission_date);
    if (this.data.site == "C") {
      this.site = "CHHC";
    } else {
      this.site = "CHHM";
    }

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
    this.postData.DoctorStatusCode = this.getDoctorStatusCode(
      this.data.Doctor_Status
    );
    this.postData.site = this.data.site;
    this.postData.CreatedBy = this.data.dr_code;
    let coDoctors1 = [];
    let coDoctors2 = [];
    let coDoctors3 = [];

    //"status": "Primary Attending Physician"
    this.isFetchDone = false;
    this.doctorService.getCoDoctors(this.data.admission_no).subscribe(
      (res: any) => {
        if (res.length) {
          this.objecthandler = true;
        } else {
          this.objecthandler = false;
        }
        //console.log(res);
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
  }

  dateChanged(data1: any) {
    //  console.log("changed data: "+data1);
  }

  // Prof Fee Pop Over
  async detail(data: any) {
    //console.log("Detail : " + this.method);

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

        this.postData.ProfFee = data.data.professionalFee;
        this.postData.Remarks = data.data.remarks;
        this.postData.DateCreated = this.getDateTime();

        let x = data.data.method;

        if (x == "POST") {
          this.doctorService.insertPF(this.postData).subscribe((res: any) => {
            if (res == true) {
              this.professionalFee = data.data.professionalFee;
              this.remarks = data.data.remarks;
              this.postData.ProfFee = data.data.professionalFee;
              this.postData.Remarks = data.data.remarks;
              this.postData.DateCreated = this.getDateTime();
              this.data.doctor_prof_fee = data.data.professionalFee;
              this.functionsService.alert(
                "Thank you, Doc! You have successfully SAVED your Professional Fee.",
                "Okay"
              );
            } else {
              this.functionsService.alert("SAVING of Professional Fee was Unsuccessful", "Okay");
            }
          });
        } else if (x == "PUT") {
          this.doctorService.updatePF(this.postData).subscribe((res: any) => {
            if (res == true) {
              this.professionalFee = data.data.professionalFee;
              this.remarks = data.data.remarks;
              this.postData.ProfFee = data.data.professionalFee;
              this.postData.Remarks = data.data.remarks;
              this.postData.DateCreated = this.getDateTime();
              this.data.doctor_prof_fee = data.data.professionalFee;
              this.functionsService.alert("Successfully UPDATED your Professional Fee.", "Okay");
            } else {
              this.functionsService.alert(
                "UPDATING of Professional Fee was Unsuccessful",
                "Okay"
              );
            }
          });
        } else if (x == "DELETE") {
          console.log("DELETE: " + this.postData);
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
                this.postData.DateCreated = this.getDateTime();
                this.data.doctor_prof_fee = data.data.professionalFee;
                this.functionsService.alert(
                  "Successfully DELETED your Professional Fee.",
                  "Okay"
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

  async closeModal() {
    await this.modalController.dismiss();
  }

  getDateTime() {
    let xx = new Date();
    let H = this.addZeroBefore(xx.getHours());
    let i = this.addZeroBefore(xx.getMinutes());
    let s = this.addZeroBefore(xx.getSeconds());
    let v = xx.getMilliseconds();

    return this.functionsService.getSystemDate() + "T" + H + ":" + i + ":" + s + "." + v + "Z";
  }

 /*  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  } */

  getDoctorStatusCode(data: string) {
    if (data == "Co-Manage") return "CM";
    if (data == "Primary Attending Physician") return "AP";
    if (data == "Consult") return "CO";
    if (data == "HMO") return "HC";
  }

  addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }

  explodeDate(data: any) {
    let myarr = data.split("T");
    if (myarr[1]) {
      let myarr2 = myarr[1].split(".");
      return myarr[0] + " | " + myarr2[0];
    }
  }
}
