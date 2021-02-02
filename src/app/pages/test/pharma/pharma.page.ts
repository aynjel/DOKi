import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthConstants } from "../../../config/auth-constants";
import { DoctorConstants } from "../../../config/auth-constants";
import { AuthService } from "../../../services/auth/auth.service";
import { DoctorService } from "../../../services/doctor/doctor.service";
import { PatientService } from "../../../services/patient/patient.service";
import { StorageService } from "../../../services/storage/storage.service";
import { ToastService } from "../../../services/toast/toast.service";
import { BehaviorSubject } from "rxjs";
import { DoctorInfoGlobal } from "../../../shared/doctor-info-global";
import { LoginData } from "../../../models/login-data.model";
import { FunctionsService } from "../../../shared/functions/functions.service"; //"@ionic/angular";
import { GoogleAnalyticsService } from "ngx-google-analytics";
import { Constants } from "../../../shared/constants";

import {  AfterViewInit, ElementRef, Renderer2, Input, NgZone } from '@angular/core';
import { AlertController, GestureController, ModalController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { ViewChildren, QueryList } from "@angular/core";
import {  IonGrid, IonContent,IonRow } from "@ionic/angular";
import { ChhAppPrivacyPolicyPage } from "./../../../chh-web-components/chh-app-privacy-policy/chh-app-privacy-policy.page"
import * as bcrypt from 'bcryptjs';
import { ChhAppChangePasswordPage } from "../../../chh-web-components/chh-app-change-password/chh-app-change-password.page";
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-pharma',
  templateUrl: './pharma.page.html',
  styleUrls: ['./pharma.page.scss'],
})
export class PharmaPage implements OnInit {
  rxcui:any;
  searchBar:any;
  collectionofData:any;
  BN:any;
  DF:any;
  IN:any;
  MIN:any;
  PIN:any;
  SBD:any;
  SBDC:any;
  SBDF:any;
  SCD:any;
  SCDC:any;
  SCDF:any;
  SCDG:any;
  SBDG:any;
  DFG:any;
  tick:boolean = false;
  displayDiv:any="";
  displayData:any="";
  drugInteraction:any="";
  drugInteractionData:any="";
  searching:boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toast: ToastService,
    private doctorService: DoctorService,
    public functionsService: FunctionsService,
    protected $gaService: GoogleAnalyticsService,
    public constants: Constants,
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2,
    private zone:NgZone,
    private modalController: ModalController,
    private patientService:PatientService,
    public alertController: AlertController
  ) {}

  ngOnInit() {


  }

  onClick(data:any){
    console.log(data);
    console.log(data.rxcui);
    console.log(data.name);

   this.displayDiv = this.displayDiv + "<ion-item>"+data.name+"-"+data.rxcui+"</ion-item><br />";
   this.displayData = this.displayData+data.rxcui+'+';

  }
  Interaction(){
    this.searching=true;
    this.displayData= this.displayData.substring(0, this.displayData.length - 1);


    
    this.patientService.interactions(this.displayData).subscribe(
      (res: any) => {
       
        this.drugInteraction = res;


        let count0 = 0;
        Object.keys(this.drugInteraction).forEach((key0) => {
          var value0 = this.drugInteraction[key0][0];
        
          if(count0 == 2){
            let count1 = 0;
            Object.keys(value0).forEach((key1) => {
              var value1 = value0[key1];
              if(count1 == 2){
                console.log(JSON.stringify(value1));
                this.drugInteractionData = value1;
              }
              count1++;
            });
          }
          count0++;
        });


      },(error)=>{
        this.searching=false;
      },()=>{  
        this.searching=false;
      });
  }
  filterList(){
    this.searching=true;
    this.patientService.restRXCUI(this.searchBar).subscribe(
      (res: any) => {
        let x = res.idGroup.rxnormId;
        this.rxcui = x.toString().replace('"','');
      },(error)=>{
        this.searching=false;
      },()=>{  
        
        this.patientService.allRelatedGroup(this.rxcui).subscribe(
          (response: any) => {

            
            this.collectionofData = JSON.parse(JSON.stringify(response));
 

            
          },(error)=>{
            this.searching=false;
          },()=>{   
            this.searching=false;

            
            Object.keys(this.collectionofData).forEach((key0) => {
              var value0 = this.collectionofData[key0];
              Object.keys(value0).forEach((key1) => {
                var value1 = value0[key1];
                
                Object.keys(value1).forEach((key2) => {
         
                  
                  var value2 = value1[key2];
                  //console.log(value2);

                  if(value1[key2].tty == "BN" ){
                    this.tick= true;
                    this.BN = JSON.parse(JSON.stringify((value2)));
                  }
                  if(value1[key2].tty == "DF" ){
                    this.DF = JSON.parse(JSON.stringify((value2)));
                  }
                  if(value1[key2].tty == "IN" ){
                    this.IN = JSON.parse(JSON.stringify((value2)));
                  }                  
                  if(value1[key2].tty == "MIN" ){
                    this.MIN = JSON.parse(JSON.stringify((value2)));
                  } 
                  if(value1[key2].tty == "PIN" ){
                    this.PIN = JSON.parse(JSON.stringify((value2)));
                  }
                  if(value1[key2].tty == "SBD" ){
                    this.SBD = JSON.parse(JSON.stringify((value2)));
                  }
                  if(value1[key2].tty == "SBDC" ){
                    this.SBDC = JSON.parse(JSON.stringify((value2)));
                  }                  
                  if(value1[key2].tty == "SBDF" ){
                    this.SBDF = JSON.parse(JSON.stringify((value2)));
                  }   
                  if(value1[key2].tty == "SCD" ){
                    this.SCD = JSON.parse(JSON.stringify((value2)));
                  }                  
                  if(value1[key2].tty == "SCDC" ){
                    this.SCDC = JSON.parse(JSON.stringify((value2)));
                  } 
                  if(value1[key2].tty == "SCDF" ){
                    this.SCDF = JSON.parse(JSON.stringify((value2)));
                  }
                  if(value1[key2].tty == "SCDG" ){
                    this.SCDG = JSON.parse(JSON.stringify((value2)));
                  }
                  if(value1[key2].tty == "SBDG" ){
                    this.SBDG = JSON.parse(JSON.stringify((value2)));
                  }                  
                  if(value1[key2].tty == "DFG" ){
                    this.DFG = JSON.parse(JSON.stringify((value2)));
                  }                  
                });
              });
            });
          }); 
      });

  }

}
