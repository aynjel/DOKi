import { Component, OnInit, Input,ViewChild, ViewContainerRef,  ComponentFactoryResolver, Renderer2 } from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import { ModalController, AlertController } from "@ionic/angular";
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
import {PatientNo} from "src/app/models/in-patient.model";






@Component({
  selector: 'app-chh-app-professional-fee',
  templateUrl: './chh-app-professional-fee.page.html',
  styleUrls: ['./chh-app-professional-fee.page.scss'],
})
export class ChhAppProfessionalFeePage implements OnInit {
  public logindata: LoginData;
  postData : InPatientData = new InPatientData();
  patientNo : PatientNo = new PatientNo();
  isDesktop:any;
  dr_name:any;
  dr_code:any;
  routerLinkBack  :any;
  patient_id  :any;
  data:any;
  patient_name:any;
  dateAdmitted:any;

  insCoor:any = "No";
  showSelection:boolean = false;
  showSeenPatient:boolean =false;
  pfInsCoor:any ;
  pfIsPatientSeen:any;

  insurance:boolean = false
  charity:boolean = false
  philhealth:boolean = false;
  isCoordinator:boolean = false;
  isPatientSeen:boolean = true;
  insuranceB:boolean;
  charityB:boolean;
  philhealthB:boolean;
  toPFMbtn:boolean = true;

  disabledselection:boolean =false;
  site:any;
  daysManaged:any;
  day:any;
  withVat:any;
  data1:any;
  payvenue:any;
  ifShowSummary:boolean = false;
  modifybtn:boolean=false;
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
    private renderer: Renderer2) {
     // this.postData = new InPatientData();
   
      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });

      //console.log('constructor');
    }

  ngOnInit() {
    let getValue= this.activatedRoute.snapshot.paramMap.get("state");


  
    this.initiateSession();
    this.routerLinkBack = "/menu/in-patients/"+this.activatedRoute.snapshot.params.id;
    this.patient_id = this.activatedRoute.snapshot.params.id;


    this.postData = JSON.parse(atob(sessionStorage.getItem("postData"))) as InPatientData;
    //console.log(this.postData);
    
    //console.log("!!!!!!!!!!!!!");
  //  console.log((this.postData));
    //console.log(JSON.stringify(this.postData));
      // if it's object
  }

  ionViewWillEnter(){
 
    

    let logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;
    //this.postData.DoctorMobileNumber = logindata[0].mobile_no;
    //this.data =[];
    this.data = JSON.parse(atob(sessionStorage.getItem("patientData")));
    this.data1 = this.data[0].doctor_prof_fee;
    
    if(this.data[0].is_posted == 0){
      this.modifybtn = false;
    }else{
      this.modifybtn = true;
    }
       console.log( this.data);
       
    if(this.data[0].IsVAT=="Y"){
      this.withVat = "Yes";
    }else{
      this.withVat = "No"; 
    }
    if(this.data[0].payvenue == "W"){
      this.payvenue = "Charity";
    }else if(this.data[0].payvenue == "H"){
      this.payvenue = "c/o Insurance";
    }else if(this.data[0].payvenue == "X"){
      this.payvenue = "c/o Insurance";
    }else if(this.data[0].payvenue == "N"){
      this.payvenue = "Not Seen ";
    }else if(this.data[0].payvenue == "A"){
      this.payvenue = "Coordinator's Fee";
    }
    if(this.data[0].site == 'C'){
      this.site = "Chong Hua Hospital - Fuente";
    }else{
      this.site = "Chong Hua Hospital Mandaue";
    }
    this.daysManaged = atob(sessionStorage.getItem("daysManaged"));
    if(this.daysManaged > 1){
      this.day = "Days";
    }else{
      this.day = "Day";
    }
    if(this.payvenue == "" || this.payvenue == null){
      this.ifShowSummary =false;
    }else{
      this.ifShowSummary = true;
    }
    
    this.checkAppearance();
    //console.log(this.data);
    
    /*
    this.doctorService.getInPatient(this.dr_code).subscribe(
      (res: any) => {
        res.forEach(element => {
            if(element.patient_no == this.activatedRoute.snapshot.params.id){
              this.data.push(element);
              this.patient_name = element.first_name + ' ' + element.last_name;
              this.patient_name = this.functionsService.convertAllFirstLetterToUpperCase(this.patient_name);
            }
        });
      },(error) => {
        console.log(error);
      },
      ()=>{
        console.log('OPERATE');
        this.checkAppearance();
      });
     */
    
  }



  redirecto(){

    let data;


    if(this.insurance){
      data = 'insurance';
      this.router.navigate([this.router.url+'/'+data]);
    }else if(this.charity){                
      data = 'charity';
      this.router.navigate([this.router.url+'/'+data]);
    }else if(this.philhealth){
      data = 'philhealth';
      this.router.navigate([this.router.url+'/'+data]);
    }else{    
      //console.log("ELSE");
      
        if(this.isCoordinator){
         // console.log(this.isCoordinator);
          this.postData.ProfFee = 0;
          this.postData.IsVAT = "N";
          this.postData.PayVenue = "A"
        //  sessionStorage.setItem('postData', JSON.stringify(this.postData)); 
          sessionStorage.setItem('postData', btoa(JSON.stringify(this.postData))); 
        }else{
          this.postData.ProfFee = 0;
          this.postData.IsVAT = "N";
          this.postData.PayVenue = "N"
          //sessionStorage.setItem('postData', JSON.stringify(this.postData)); 
          sessionStorage.setItem('postData', btoa(JSON.stringify(this.postData))); 
        }
        //console.log("is patient seen :"+this.isPatientSeen);
        
        if(this.isPatientSeen==false){
         // console.log("TRANSACTION SUMMARY");
          //this.router.navigate([this.router.url+'/transaction-summary']);
          let usrl = "/menu/in-patients/"+this.patient_id+"/professional-fee-transaction-summary";
        //  console.log(usrl);
          
          this.router.navigate([usrl]);
        }
    }


  }

  checkAppearance(){
    

    let d = new Date(this.data[0].admission_date);
    this.dateAdmitted = d.toUTCString();
    //console.log(this.dateAdmitted);
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_code = this.logindata[0].dr_code;
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
  initiateSession(){
    //this.pfInsCoor = sessionStorage.getItem("pfInsCoor");
   // this.pfIsPatientSeen = sessionStorage.getItem("pfIsPatientSeen");
    //this.checkEmitters();
  }

  // checkEmitters(){

  //   if(this.pfInsCoor!=""){
  //     this.showSeenPatient = true;
  //   }else{
  //     this.showSeenPatient = false;
  //   }
  //       if(this.pfIsPatientSeen == "y"){
  //     this.showSelection = true;
  //   }else{
  //     this.showSelection = false;
  //   }
  // }

  // isInsuranceCoordinatorEventEmitter(e){
  //   if(e){
  //     this.patientNo.pfInsCoor = "y";
  //     this.pfInsCoor = "y";
  //   }else{
  //     this.patientNo.pfInsCoor = "n";
  //     this.pfInsCoor = "n";
  //   }
  //   this.patientNo.pfIsPatientSeen="";
  //   sessionStorage.setItem('pfInsCoor', this.pfInsCoor); 
  //   sessionStorage.setItem(this.activatedRoute.snapshot.params.id,JSON.stringify(this.patientNo)); 
  //   this.showSeenPatient = true;
    
  // }
  // isPatientSeenEventEmitter(e){
  //   if(e){
  //     this.pfIsPatientSeen = "y";
  //     this.patientNo.pfIsPatientSeen = "y";
  //   }else{
  //     this.pfIsPatientSeen = "n";
  //     this.patientNo.pfIsPatientSeen = "y";
  //   }
  //   sessionStorage.setItem('pfIsPatientSeen', this.pfIsPatientSeen); 
  //   sessionStorage.setItem(this.activatedRoute.snapshot.params.id,JSON.stringify(this.patientNo)); 
  //   if(e){
  //     this.showSelection = true;
  //   }else{
  //     this.showSelection = false;
  //   }
    
  // }
  isPatientSeenf(f,e){
    //console.log(f+" | "+e);
    if(f == 'isPatientSeen' && e == false){
      this.toPFMbtn = true;
     // console.log("11111111111111");
      this.disabledselection = false;
    }else  if(f == 'isPatientSeen' && e == true){
      this.insurance = this.charity = this.philhealth = false;
     // this.toPFMbtn = false;
      console.log("2222222222222");
      this.disabledselection = true;
    }
  }
  buttonclick(f,e){
    //console.log(f+" | "+e);
    if(f == 'insurance' && e == true){
      this.charity = this.philhealth = false;
    }else  if(f == 'insurance' && e == false){
      this.insurance = this.charity = this.philhealth = false;
    }
    if(f == 'charity' && e == true){
      this.insurance = this.philhealth = false;
    }else  if(f == 'charity' && e == false){
      this.insurance = this.charity = this.philhealth = false;
    }
    if(f == 'philhealth' && e == true){
      this.charity = this.insurance = false;
    }else  if(f == 'philhealth' && e == false){
      this.insurance = this.charity = this.philhealth = false;
    }

    if( this.insurance == true || this.charity == true || this.philhealth  == true){
      this.toPFMbtn = true;
     // console.log(this.toPFMbtn);
    }else{
      this.toPFMbtn = false;
    //  console.log(this.toPFMbtn);
    }


  }
  modifyProfFee(){
      this.ifShowSummary = false;
  }
}
