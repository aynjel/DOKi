import { Component, OnInit, Input,ViewChild, ViewContainerRef,  ComponentFactoryResolver, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import { ModalController, AlertController, NavController } from "@ionic/angular";
import { ChhAppFeePage } from "../../../chh-web-components/chh-app-fee/chh-app-fee.page";
import { from } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { timeStamp } from "console";
import { DoctorService } from "src/app/services/doctor/doctor.service";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { AuthService } from "src/app/services/auth/auth.service";
import { LoginData } from "../../../models/login-data.model";
import { FunctionsService } from "../../../shared/functions/functions.service";
import { PatientService } from "src/app/services/patient/patient.service";
import { logWarnings } from "protractor/built/driverProviders";
import { ChemistryPage } from "../../../chh-web-components/chh-app-test/chh-app-chemistry/chemistry.page";
import { ChhAppBasePage } from "../../../chh-web-components/chh-app-test/chh-app-base/chh-app-base.page";
import { Messages } from "../../../shared/messages";
import { ScreenSizeService } from "../../../services/screen-size/screen-size.service";
import { ChhAppTestChemistryComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-chemistry/chh-app-test-chemistry.component";
import { ChhAppTestFecalysisComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-fecalysis/chh-app-test-fecalysis.component";
import { ChhAppTestSerologyComponent } from "../../../chh-web-components/chh-app-test/chh-app-test-serology/chh-app-test-serology.component";
import { StorageService } from "../../../services/storage/storage.service";
import { AuthConstants } from "../../../config/auth-constants";
import { executionAsyncResource } from "async_hooks";
import { Constants } from "src/app/shared/constants";


import {InPatientData} from "src/app/models/in-patient.model";
import {LaboratoryTestModalPage} from "../laboratory-test-modal/laboratory-test-modal.page";



@Component({
  selector: "app-in-patient-detail",
  templateUrl: "./in-patient-detail.page.html",
  styleUrls: ["./in-patient-detail.page.scss"],
})

export class InPatientDetailPage   {
  public logindata: LoginData;
  data: any=[];
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
  currentExamList_filtered: any = [];
  isDesktop: boolean;
  examListSkeleton:boolean = false;
  ExamData:any = "";
  hospitalSite:any;
  serology:boolean = false;
  chemistry:boolean = false;
  fecalysis:boolean = false;
  cbc:boolean = false;
  urinalysis:boolean = false;
  refresher:boolean = true;
  searchBar:any;
  HighlightRow:number;
  ClickedRow:any; 
  dr_code:any;
  dr_name:any;
  patient_name:any;
  patient_no:any;
  postData : InPatientData  = new InPatientData();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
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
    public messages: Messages,
    public storageService: StorageService,
    public constants: Constants,
    private renderer: Renderer2,
    public nav:NavController) {
      
      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
      this.ClickedRow = function(index){  
        this.HighlightRow = index;  
      } 

    }

 
  ionViewWillEnter(){
    this.checkAppearance();
    let logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;
    this.postData.DoctorMobileNumber = logindata[0].mobile_no;
    this.data =[];
    this.doctorService.getInPatient(this.dr_code).subscribe(
      (res: any) => {          
        res.forEach(element => {
            if(element.patient_no == this.activatedRoute.snapshot.params.id){
              this.data.push(element);
              this.patient_name = element.first_name + ' ' + element.last_name;
            }
        });
      },(error) => {
        console.log(error);
      },
      ()=>{      
        this.operate();
      });
  }
  operate(){
    let d = new Date(this.data[0].admission_date);
    this.dateAdmitted = d.toUTCString();
    this.$gaService.pageView(
      "/In-Patient/Patient Details",
      "Patient Details Modal"
    );
    this.$gaService.event("Patient Information", "User Flow", this.dr_name);
    this.patient_no = this.data[0].patient_no;
    this.getExamList(this.data[0].patient_no);
      //populate empty feild
    this.postData.IsVAT = "";
    this.postData.PayVenue = "";
    this.postData.Remarks = "";
    this.postData.ProfFee = 0;
    this.postData.OldProfFee = 0;
    if (this.data[0].site == "C") {
      this.site = "CHHC";
      //this.postData.PatientSite = "CEBU";
      this.postData.BillingMobileNumber = atob(localStorage.getItem("C"));
    } else {
      this.site = "CHHM";
      //this.postData.PatientSite = "MANDAUE";
      this.postData.BillingMobileNumber = atob(localStorage.getItem("M"));
    }
    this.postData.RoomNumber = this.data[0].room_no;
    let smsgateway = JSON.parse(localStorage.getItem("smsGateway"));
    let ssms=[];
    Object.keys(smsgateway).forEach((key) => {
      var value = smsgateway[key];
      let sms =
        '{"settings": "smsGateway","property": "' +key +'","value": "' +value +'"}';
        ssms.push(JSON.parse(sms));
    });
    this.postData.SmsGateWay = ssms;
    this.professionalFee = this.data[0].doctor_prof_fee;
    this.remarks = this.data[0].remarks;

    if (this.data[0].doctor_prof_fee == null) {
      this.method = "POST";
    } else {
      this.method = "";
    }
    this.postData.AdmisisonNo = this.data[0].admission_no;
    this.postData.DoctorCode = this.data[0].dr_code;
    //this.postData.DoctorCode = this.data.dr_code;
    this.postData.DoctorStatusCode = this.data[0].Doctor_Status_code;
    this.postData.site = this.data[0].site;
    this.postData.CreatedBy = this.data[0].dr_code;
    let coDoctors1 = [];
    let coDoctors2 = [];
    let coDoctors3 = [];
    //"status": "Primary Attending Physician"
    this.isFetchDone = false;
//    _____   _____   _____        _____   _____        _____   _____   _____   _____   _____   _____   
//   /  ___| | ____| |_   _|      /  ___| /  _  \      |  _  \ /  _  \ /  ___| |_   _| /  _  \ |  _  \  
//  | |     | |__     | |        | |     | | | |      | | | | | | | | | |       | |   | | | | | |_| |  
//  | |  _  |  __|    | |        | |     | | | |      | | | | | | | | | |       | |   | | | | |  _  /  
//  | |_| | | |___    | |        | |___  | |_| |      | |_| | | |_| | | |___    | |   | |_| | | | \ \  
//  \_____/ |_____|   |_|        \_____| \_____/      |_____/ \_____/ \_____|   |_|   \_____/ |_|  \_\ 
    this.doctorService.getCoDoctors(this.data[0].admission_no).subscribe(
      (res: any) => {

        res.forEach((element) => {
          if (element.dr_code == this.data[0].dr_code) {
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
    //

    this.doctorService.getAdmittingDiagnosis(this.data[0].admission_no).subscribe(
      (res: any) => {

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
    if (this.data[0].admission_status == "DN") {
      this.doctorService.getFinalDiagnosis(this.data[0].admission_no).subscribe(
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

    this.postData.DateCreated = this.functionsService.getSystemDateTime();
    sessionStorage.setItem('postData', JSON.stringify(this.postData)); 


  }
  ngOnInit() {


  }
  updateDisplay(data:boolean){
    if(data){
      this.refresher = !this.refresher;
    }else{
      setTimeout( ()=> this.refresher=true,50);
    }
  }
  filterList(){

    this.currentExamList_filtered = [];
    let temp_testname;
    let temp_examtype;
    let temp_exam;
    let temp_searcbar
    
    this.currentExamList.forEach(element => {
      temp_testname = element.Test_Name.toLowerCase();
      temp_examtype = element.Exam.toLowerCase();
      temp_exam = element.ExamType.toLowerCase();
      temp_searcbar = this.searchBar.toLowerCase();
        if( 
            (temp_testname.search(temp_searcbar) >= 0) || 
            (temp_examtype.search(temp_searcbar) >= 0) || 
            (temp_exam.search(temp_searcbar) >= 0)
          ){
          this.currentExamList_filtered.push(element);    
        }
    });

    
  }
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

  async examDetails(data: any, site:any,i) {

    this.HighlightRow = i;  
    this.ExamData = data;
    this.hospitalSite = site;

    
    if(!this.isDesktop){

      
      const modal = await this._modalController.create({
        component: ChhAppBasePage,
        componentProps: { ExamDetails: data,Site:site },
        cssClass: "my-custom-modal-inpatient-css",
      });
      modal.present();
        return await modal.onDidDismiss().then((data: any) => {
      });
    }else{

      
      if(this.ExamData.Exam == 'Serology' ){
        this.chemistry = false;
        this.serology = true;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = false;
      }else if(this.ExamData.Exam == 'Chemistry'){
        this.chemistry = true;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = false;
      }else if(this.ExamData.Exam == 'Fecalysis'){
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = true;
        this.urinalysis = false;
        this.cbc = false;
      }else if(this.ExamData.Exam == 'Urinalysis'){
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = true;
        this.cbc = false;
      }else if(this.ExamData.Exam == 'Hematology' && this.ExamData.ExamType == 'CBC'){
        this.chemistry = false;
        this.serology = false;
        this.fecalysis = false;
        this.urinalysis = false;
        this.cbc = true
      }


      
      this.updateDisplay(true);
      this.updateDisplay(false);
     // this.loadComponents();
    }

 
    
    
    

  }
  getExamList(data) {
    console.log(data);
    
    this.ionSkeleton = true;
    var date1 = new Date(this.data[0].admission_date);
    var seconds1 = date1.getTime() / 1000; //1440516958
    this.currentExamList = [];
    this.examListSkeleton = true;
    this.patientService.getCebuExamList(data).subscribe(
      (res: any) => {

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
            this.currentExamList_filtered.push(element);
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


  dateChanged(data1: any) {
    //  this.functionsService.logToConsole("changed data: "+data1);
  }
  // Prof Fee Pop Over
  async detail(data: any) {
    //this.functionsService.logToConsole("Detail : " + this.method);

    if (this.data[0].doctor_prof_fee == null) {
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
              this.data[0].doctor_prof_fee = data.data.professionalFee;
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
          this.postData.OldProfFee = this.data[0].doctor_prof_fee;
          this.doctorService.updatePF(this.postData).subscribe((res: any) => {
            if (res == true) {
              this.professionalFee = data.data.professionalFee;
              this.remarks = data.data.remarks;
              this.postData.ProfFee = data.data.professionalFee;
              this.postData.Remarks = data.data.remarks;
              this.postData.DateCreated = this.functionsService.getSystemDateTime();
              this.data[0].doctor_prof_fee = data.data.professionalFee;
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
                this.data[0].doctor_prof_fee = data.data.professionalFee;
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



  redirecttoPF(){
    //this.router.navigate(['menu/in-patients/'+this.activatedRoute.snapshot.params.id+'/professional-fee']);
    let datasend = {
      first_name: "string",
      last_name: "string",
      status: "string",
      mobile_no: "string",
      dept_short_desc: "string"
    };

    /*this.router.navigate(['menu/in-patients/' + this.activatedRoute.snapshot.params.id+'/professional-fee',JSON.stringify(datasend)]);*/
    
    
    this.nav.navigateForward('menu/in-patients/' + this.activatedRoute.snapshot.params.id+'/professional-fee', {
      state: {

      },
    });
  
  }





  back(){

  }
  checkAppearance(){

    let dr_username = atob(localStorage.getItem("username"));
    this.patientService.getUserSettings('DPP',dr_username).subscribe(
      (res: any) => {       
        if(Object.keys(res).length >= 1){
          let data = JSON.stringify(res);data = '['+data+']';let adat = JSON.parse(data);
          adat.forEach(el => {
            if(typeof el.appearance !== 'undefined'){
              if(el.appearance.darkmode == 1){
                this.renderer.setAttribute(document.body, "color-theme", "dark");
              }else{
                this.renderer.setAttribute(document.body, "color-theme", "light");
              }
            }else{
              this.renderer.setAttribute(document.body, "color-theme", "light");
            }
          });
        }
      });
  }

  async presentlabtestresult(){

      const modal = await this.modalController.create({
        component: LaboratoryTestModalPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'patient_no': this.patient_no
        }
      });
      return await modal.present();

  }



}
