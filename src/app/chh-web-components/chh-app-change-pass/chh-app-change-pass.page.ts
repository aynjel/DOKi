import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, IonItem } from "@ionic/angular";
import {  AfterViewInit, ElementRef, Renderer2, Input, NgZone } from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { ViewChildren, QueryList } from "@angular/core";
import {  IonGrid, IonContent,IonRow } from "@ionic/angular";
import { Constants } from "../../shared/constants";
import { PatientService } from "../../services/patient/patient.service";
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { LoginData } from "../../models/login-data.model";
import { AuthService } from 'src/app/services/auth/auth.service';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-chh-app-change-pass',
  templateUrl: './chh-app-change-pass.page.html',
  styleUrls: ['./chh-app-change-pass.page.scss'],
})
export class ChhAppChangePassPage implements AfterViewInit {
  public logindata: LoginData;
  OldPassword;
  NewPassword;
  ConfirmPassword;
  errMessage;

  isActiveToggleTextPassword1: Boolean = true;
  isEyeOnOff1: Boolean = true;
  isActiveToggleTextPassword2: Boolean = true;
  isEyeOnOff2: Boolean = true;
  isActiveToggleTextPassword3: Boolean = true;
  isEyeOnOff3: Boolean = true;
  uxSaveCancel:boolean = true;
  serverResponse:any;
  constructor(public modalController: ModalController,
    private patientService: PatientService,
    public constants: Constants,
    private gestureCtrl: GestureController,
    public alertController: AlertController,
    private element: ElementRef,
    public functionsService: FunctionsService,
    private renderer: Renderer2,
    private authService: AuthService,
    private zone:NgZone) { }
    @ViewChildren('psWord1', {read: ElementRef}) psWord1:QueryList<ElementRef>
    @ViewChildren('psWord2', {read: ElementRef}) psWord2:QueryList<ElementRef>
  async ngAfterViewInit() {
    const rectangle1 = document.querySelector('.rectangle1');
    const rectangle2 = document.querySelector('.rectangle2');
    const rectangle3 = document.querySelector('.rectangle3');
     const options1: GestureConfig = {
      el: rectangle1,threshold: 0,gestureName: 'slide-drawer-swipe1',
      onStart: (ev) => { 
        this.zone.run(() =>{
          this.isActiveToggleTextPassword1 = (this.isActiveToggleTextPassword1==true)?false:true;
          this.isEyeOnOff1 = (this.isEyeOnOff1==true)?false:true;
        });
      },onEnd: ()=>{
        this.zone.run(() =>{
          this.isActiveToggleTextPassword1 = (this.isActiveToggleTextPassword1==true)?false:true;
          this.isEyeOnOff1 = (this.isEyeOnOff1==true)?false:true;
        })
      }
     };
    const options2: GestureConfig = {
      el: rectangle2,threshold: 0,gestureName: 'slide-drawer-swipe2',
      onStart: (ev) => { 
        this.zone.run(() =>{
          this.isActiveToggleTextPassword2 = (this.isActiveToggleTextPassword2==true)?false:true;
          this.isEyeOnOff2 = (this.isEyeOnOff2==true)?false:true;
        })
      },onEnd: ()=>{
        this.zone.run(() =>{
          this.isActiveToggleTextPassword2 = (this.isActiveToggleTextPassword2==true)?false:true;
          this.isEyeOnOff2 = (this.isEyeOnOff2==true)?false:true;        
        })
      }
    };
    const options3: GestureConfig = {
      el: rectangle3,threshold: 0,gestureName: 'slide-drawer-swipe3',
      onStart: (ev) => { 
        this.zone.run(() =>{
          this.isActiveToggleTextPassword3 = (this.isActiveToggleTextPassword3==true)?false:true;
          this.isEyeOnOff3 = (this.isEyeOnOff3==true)?false:true;   
        })
      },onEnd: ()=>{
        this.zone.run(() =>{
          this.isActiveToggleTextPassword3 = (this.isActiveToggleTextPassword3==true)?false:true;
          this.isEyeOnOff3 = (this.isEyeOnOff3==true)?false:true; 
        })
      }
    };
     const gesture1 = await this.gestureCtrl.create(options1);
     const gesture2 = await this.gestureCtrl.create(options2);
     const gesture3 = await this.gestureCtrl.create(options3);
     gesture1.enable();
     gesture2.enable();
     gesture3.enable();
   }
  public getType1() {return this.isActiveToggleTextPassword1 ? 'password' : 'text';}
  public getType2() {return this.isActiveToggleTextPassword2 ? 'password' : 'text';}
  public getType3() {return this.isActiveToggleTextPassword3 ? 'password' : 'text';}
  public getName1() {return this.isEyeOnOff1 ? 'eye-off-outline' : 'eye-outline';}
  public getName2() {return this.isEyeOnOff2 ? 'eye-off-outline' : 'eye-outline';}
  public getName3() {return this.isEyeOnOff3 ? 'eye-off-outline' : 'eye-outline';}
  hashed_newPassword;
  hashed_oldPassword;
  dr_name;
  dr_code ;
  dr_username;
  saltRounds = 10;
  ngOnInit() {
    this.logindata = <LoginData>this.authService.userData$.getValue();
    this.dr_name = this.logindata[0].last_name;
    this.dr_code = this.logindata[0].dr_code;
    this.dr_username = atob(localStorage.getItem("username"));
    let json = '{"appCode": "DPP","userName": "'+this.dr_username+'"}';let resultJson;
    console.log(json);
    
    this.patientService.mockValidate(json).subscribe(
      (res: any) => {

        resultJson = res.Data;            
      },(error)=>{},
      ()=>{       
        this.hashed_oldPassword = resultJson;    
     

      });
  }









  async closeModal() {
    await this.modalController.dismiss();
  }
  async alert(data1: any, data2: any,data3:boolean) {
    const alert = await this.alertController.create({cssClass: "my-custom-class",message: data1,buttons: [{ text: data2, handler: () => {
      if(data3){this.modalController.dismiss();}
    } }],});await alert.present();
  }


  validatePassword(){
    bcrypt.compare(this.OldPassword, this.hashed_oldPassword).then(
      (result) => {
        if(result){


          bcrypt.hash(this.NewPassword, this.saltRounds).then(
            (hash) => {
              let resJson = '{"appCode": "DPP","userName": "'+this.dr_username+'","oldPassword": "'+this.hashed_oldPassword+'","newPassword":"'+hash+'"}';
              console.log(resJson);
              
              this.patientService.mockChangePassword(resJson).subscribe(
                (res: any) => {
                  this.serverResponse = res; 
                },(error)=>{},
                ()=>{
                  if(typeof this.serverResponse.ErrorCode !== 'undefined'){
                    this.alert(this.serverResponse.ErrorDescription,"Okay",false);
                  }else{
                    this.alert(this.serverResponse.Message,"Okay",true);
                  }

                }
              );
          });



        }else{
          this.functionsService.alert("Oldpassword != Saved Password","Okay");
        }
      }
    );
  }











  save(){
    
    let psWord1_1 = this.psWord1.toArray();
    psWord1_1[0].nativeElement.style.transition = '1s';
    psWord1_1[0].nativeElement.style.transform =  `translateX(${10}px)`;
    psWord1_1[0].nativeElement.style.transition = '1s';
    psWord1_1[0].nativeElement.style.transform =  ``;  
    //psWord1_1[0].nativeElement.style.transform =  `translateX(${10}px)`;

    if(this.NewPassword != this.ConfirmPassword){
      //console.log('111');
      
      this.errMessage = " (passwords did not Match)";
      let myDiv1 = document.getElementById('pWord1');
      let myDiv2 = document.getElementById('pWord2');
      myDiv1.style.color = 'red'; 
      myDiv2.style.color = 'red'; 
    }else{

      //console.log('222');
      this.errMessage = "";
      let myDiv1 = document.getElementById('pWord1');
      let myDiv2 = document.getElementById('pWord2');
      myDiv1.style.color = 'black'; 
      myDiv2.style.color = 'black';     
      if(this.NewPassword != this.OldPassword){

        this.validatePassword();
        /*
        bcrypt.hash(this.NewPassword, this.saltRounds).then(
          (hash) => {
            console.log(hash);
            
         
            let resJson = '{"appCode": "DPP","userName": "'+this.usename+'","oldPassword": "'+hash+'","newPassword":"'+hash+'"}';
            console.log(resJson);
            
               /*
            this.patientService.changePassword(smpJSON).subscribe(
              (res) => {
                this.serverResponse = res; 
              },(error)=>{
                this.functionsService.alert(
                  "Sorry, Doc. We cannot change your password at the moment. Please try again.",
                  "Okay"
                );
              },()=>{
                if(typeof this.serverResponse.ErrorCode !== 'undefined'){
                  this.alert(this.serverResponse.ErrorDescription,"Okay",false);
                }else{
                  this.alert(this.serverResponse.Message,"Okay",true);
                }
              }
            );
          }
        );
        */





      }else{
        this.errMessage = " (Old and New Passwords are the same)";
        let myDiv0 = document.getElementById('pWord0');
        let myDiv1 = document.getElementById('pWord1');
        let myDiv2 = document.getElementById('pWord2');
        
        myDiv0.style.color = 'red'; 
        myDiv1.style.color = 'red'; 
        myDiv2.style.color = 'red'; 
      }
    }

  }
}
