import { Component, OnInit, Input } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { FeePage } from "../fee/fee.page";
import { from } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { timeStamp } from "console";
import { DoctorService } from "src/app/services/doctor.service";
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from 'src/app/services/auth.service';
import {LoginData} from '../../models/logindata.model';
@Component({
  selector: "app-inpatientmodal",
  templateUrl: "./inpatientmodal.page.html",
  styleUrls: ["./inpatientmodal.page.scss"],
})
export class InpatientmodalPage implements OnInit {
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
  finalDiagnosis:any;
  finalDiagnosis1:any;
  finalDiagnosis2:any;
  admittingDiagnosis:any;
  admittingDiagnosis1:any;
  admittingDiagnosis2:any;
  text: string;
  limit: number = 40;
  truncating = true;
  truncating1 = true;
  daysOfManage:any;
  constructor(
    private modalController: ModalController,
    private popover: PopoverController,
    private doctorService: DoctorService,
    public alertController: AlertController,
    protected $gaService: GoogleAnalyticsService,
    private authService:AuthService
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

  async Alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  }

  ngOnInit() {
 
    this.$gaService.pageView('/In-Patient/Patient Details', 'Patient Details Modal');

    let logindata = <LoginData>this.authService.userData$.getValue();
    let  dr_name = logindata[0].last_name;
    this.$gaService.event('Patient Information','User Flow',dr_name);

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
        console.log(res);
        res.forEach(element => {
          if(element.dr_code == this.data.dr_code){
            if(element.no_of_days_manage == null){
              this.daysOfManage = 0;
            }else{
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
        this.Alert("Server Error", "Okay");
      },
      () => {
        this.isFetchDone = true;
      }
    );


//admitting diagnosis
this.doctorService.getAdmittingDiagnosis(this.data.admission_no).subscribe(
  (res: any) => {
    this.admittingDiagnosis = this.camelCase(res[0].admitting_diagnosis2);
    this.admittingDiagnosis1 = this.truncateChar(this.camelCase(this.admittingDiagnosis),100);
    this.admittingDiagnosis2 = this.camelCase(this.admittingDiagnosis);
  },
  (error) => {
    this.isFetchDone = true;
    this.Alert("Server Error", "Okay");
  },
  () => {
    this.isFetchDone = true;
  }
);
//final diagnosis
if(this.data.admission_status == 'DN'){
    this.doctorService.getFinalDiagnosis(this.data.admission_no).subscribe(
      (res: any) => {
        this.finalDiagnosis = res[0].final_diagnosis;
        this.finalDiagnosis1 = this.truncateChar(this.camelCase(this.finalDiagnosis),50);
        this.finalDiagnosis2 = this.finalDiagnosis.replace(/(\r\n|\n|\r)/gm, "").split('.)');
        this.finalDiagnosis2.shift();
        for(let i = 0; i < this.finalDiagnosis2.length-1; i++){
          this.finalDiagnosis2[i] = this.finalDiagnosis2[i].substring(0, this.finalDiagnosis2[i].length - 1);
          console.log(this.finalDiagnosis2[i]);
        }
        for(let i = 0; i < this.finalDiagnosis2.length; i++){
          this.finalDiagnosis2[i] = i+1 + '.) ' + this.camelCase(this.finalDiagnosis2[i]);
        }

      },
      (error) => {
        this.isFetchDone = true;
        this.Alert("Server Error", "Okay");
      },
      () => {
        this.isFetchDone = true;
      }
    );
  }

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
      component: FeePage,
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
            if(res == true){
              this.professionalFee = data.data.professionalFee;
              this.remarks = data.data.remarks;
              this.postData.ProfFee = data.data.professionalFee;
              this.postData.Remarks = data.data.remarks;
              this.postData.DateCreated = this.getDateTime();
              this.data.doctor_prof_fee = data.data.professionalFee;
              this.Alert(
                "Thank you, Doc! You have successfully SAVED your Professional Fee.",
                "Okay"
              );
            }else{
              this.Alert(
                "SAVING of Professional Fee was Unsuccessful",
                "Okay"
              );
            }
          });
        } else if (x == "PUT") {
          this.doctorService.updatePF(this.postData).subscribe((res: any) => {
            if(res == true){
              this.professionalFee = data.data.professionalFee;
              this.remarks = data.data.remarks;
              this.postData.ProfFee = data.data.professionalFee;
              this.postData.Remarks = data.data.remarks;
              this.postData.DateCreated = this.getDateTime();
              this.data.doctor_prof_fee = data.data.professionalFee;
              this.Alert(
                "Successfully UPDATED your Professional Fee.",
                "Okay"
              );
            }else{
              this.Alert(
                "UPDATING of Professional Fee was Unsuccessful",
                "Okay"
              );
            }
          });
        } else if (x == "DELETE") {
          console.log("DELETE: " + this.postData);
          this.doctorService
            .DeletePf(this.postData.AdmisisonNo, this.postData.DoctorStatusCode, this.postData.DoctorCode)
            .subscribe((res: any) => {
              if(res == true){
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.professionalFee = data.data.professionalFee;
                this.remarks = data.data.remarks;
                this.postData.ProfFee = data.data.professionalFee;
                this.postData.Remarks = data.data.remarks;
                this.postData.DateCreated = this.getDateTime();
                this.data.doctor_prof_fee = data.data.professionalFee;
                this.Alert(
                  "Successfully DELETED your Professional Fee.",
                  "Okay"
                );
              }else{
                this.Alert(
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

    return this.yyyymmdd() + "T" + H + ":" + i + ":" + s + "." + v + "Z";
  }

  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  }

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
}
