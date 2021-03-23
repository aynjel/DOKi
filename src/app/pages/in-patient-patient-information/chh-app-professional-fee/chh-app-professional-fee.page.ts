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
import { ChemistryPage } from "../../../chh-web-components/chh-app-test/chemistry/chemistry.page";
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


@Component({
  selector: 'app-chh-app-professional-fee',
  templateUrl: './chh-app-professional-fee.page.html',
  styleUrls: ['./chh-app-professional-fee.page.scss'],
})
export class ChhAppProfessionalFeePage implements OnInit {
  public logindata: LoginData;
  isDesktop:any;
  dr_name:any;
  dr_code:any;
  routerLinkBack  :any;
  patient_id  :any;
  data:any;
  patient_name:any;
  dateAdmitted:any;
  yesno:any = "Yes";
  yesnoToggle:boolean = true;
  insCoor:any = "No";
  showSelection:boolean = false;
  showSeenPatient:boolean =false;
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
    SmsGateWay: [],
    OldProfFee: "string",
  };
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

      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });

      console.log('constructor');
    }

  ngOnInit() {


    this.routerLinkBack = "/menu/in-patients/"+this.activatedRoute.snapshot.params.id;
    this.patient_id = this.activatedRoute.snapshot.params.id;
  }

  ionViewWillEnter(){
 
    
   /* let logindata = <LoginData>this.authService.userData$.getValue();
    console.log(logindata);
    let dr_name = logindata[0].last_name;
    this.dr_code = logindata[0].dr_code;*/

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
              this.patient_name = this.functionsService.convertAllFirstLetterToUpperCase(this.patient_name);
            }
        });
      },(error) => {
        console.log(error);
        
      },
      ()=>{
        console.log('OPERATE');
        this.checkAppearance();
        //this.operate();
      });
     
    console.log( this.dr_code );
    
  }
  redirecto(data){
    console.log(this.router.url);
    this.router.navigate([this.router.url+'/'+data]);
  }

  checkAppearance(){
    

    let d = new Date(this.data[0].admission_date);
    this.dateAdmitted = d.toUTCString();
    console.log(this.dateAdmitted);




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

  viewtoggle(e){
    //this.yesnoToggle = !this.yesnoToggle;
/*
    if(this.yesnoToggle){
      this.yesno = "Yes";
    }else{
      this.yesno = "No";
    }
      console.log(e.detail.checked);
      if(e.detail.checked){
        this.insCoor = "Yes";
      }else{
        this.insCoor = "No";
      }*/

      //console.log(e);
      console.log(e.detail.value);

      if(e.detail.value == "y"){
        this.showSeenPatient = true;
      }else if(e.detail.value == "n"){
        this.showSeenPatient = true;
      }else{
        this.showSeenPatient = false;
      }
  }

  viewtoggle1(e){
    //this.yesnoToggle = !this.yesnoToggle;
/*
    if(this.yesnoToggle){
      this.yesno = "Yes";
    }else{
      this.yesno = "No";
    }
      console.log(e.detail.checked);
      if(e.detail.checked){
        this.insCoor = "Yes";
      }else{
        this.insCoor = "No";
      }*/

      //console.log(e);
      console.log(e.detail.value);

      if(e.detail.value == "y"){
        this.showSelection = true;
      }else{
        this.showSelection = false;
      }
  }

  
}
