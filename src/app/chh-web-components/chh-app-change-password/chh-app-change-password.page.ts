import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, IonItem } from '@ionic/angular';
import {
  AfterViewInit,
  ElementRef,
  Renderer2,
  Input,
  NgZone,
} from '@angular/core';
import { GestureController } from '@ionic/angular';
import { Gesture, GestureConfig } from '@ionic/core';
import { ViewChildren, QueryList } from '@angular/core';
import { IonGrid, IonContent, IonRow } from '@ionic/angular';
import { Constants } from '../../shared/constants';
import { PatientService } from '../../services/patient/patient.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { LoginData } from '../../models/login-data.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as bcrypt from 'bcryptjs';

import { CustomValidators } from '../../shared/custom-validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from '../../shared/password-strength.validators';
@Component({
  selector: 'app-chh-app-change-password',
  templateUrl: './chh-app-change-password.page.html',
  styleUrls: ['./chh-app-change-password.page.scss'],
})
export class ChhAppChangePasswordPage {
  @Input() old_password: any;
  public form: FormGroup;
  OldPassword;
  NewPassword;
  ConfirmPassword;
  isActiveToggleTextPassword1: Boolean = true;
  isEyeOnOff1: Boolean = true;
  isActiveToggleTextPassword2: Boolean = true;
  isEyeOnOff2: Boolean = true;
  isActiveToggleTextPassword3: Boolean = true;
  isEyeOnOff3: Boolean = true;
  dr_username;
  errMessage;
  saltRounds = 10;
  public frmSignup: FormGroup;
  constructor(
    public modalController: ModalController,
    public constants: Constants,
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2,
    private patientService: PatientService,
    public functionsService: FunctionsService,
    public alertController: AlertController,
    private zone: NgZone,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      password: ['', [Validators.required, PasswordStrengthValidator]],
    });
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(8),
          ]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.dr_username = atob(localStorage.getItem('username'));
  }

  showPassword1() {
    this.isActiveToggleTextPassword2 =
      this.isActiveToggleTextPassword2 == true ? false : true;
    this.isEyeOnOff2 = this.isEyeOnOff2 == true ? false : true;
  }

  showPassword2() {
    this.isActiveToggleTextPassword3 =
      this.isActiveToggleTextPassword3 == true ? false : true;
    this.isEyeOnOff3 = this.isEyeOnOff3 == true ? false : true;
  }
  /*
  async ngAfterViewInit() {

    const rectangle2 = document.querySelector('.rectangle2');
    const rectangle3 = document.querySelector('.rectangle3');

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

     const gesture2 = await this.gestureCtrl.create(options2);
     const gesture3 = await this.gestureCtrl.create(options3);

     gesture2.enable();
     gesture3.enable();
   }*/

  public getType2() {
    return this.isActiveToggleTextPassword2 ? 'password' : 'text';
  }

  public getType3() {
    return this.isActiveToggleTextPassword3 ? 'password' : 'text';
  }

  public getName2() {
    return this.isEyeOnOff2 ? 'eye-off-outline' : 'eye-outline';
  }

  public getName3() {
    return this.isEyeOnOff3 ? 'eye-off-outline' : 'eye-outline';
  }

  async closeModal() {
    await this.modalController.dismiss('None');
  }

  /*<div class="alert-head sc-ion-alert-ios"><h2 id="alert-1-hdr" class="alert-title sc-ion-alert-ios">Use this lightsaber?</h2></div>
  <div id="alert-1-msg" class="alert-message sc-ion-alert-ios">Do you agree to use this lightsaber to do good across the galaxy?</div>*/

  save() {
    if (this.NewPassword != this.ConfirmPassword) {
      this.errMessage = ' (passwords did not Match)';
      let myDiv1 = document.getElementById('pWord1');
      let myDiv2 = document.getElementById('pWord2');
      myDiv1.style.color = 'red';
      myDiv2.style.color = 'red';
    } else {
      this.errMessage = '';
      let myDiv1 = document.getElementById('pWord1');
      let myDiv2 = document.getElementById('pWord2');
      myDiv1.style.color = 'black';
      myDiv2.style.color = 'black';
      let hashedPassword;
      bcrypt.hash(this.NewPassword, this.saltRounds).then((hash) => {
        hashedPassword = hash;
        let resJson =
          '{"appCode": "DPP","username": "' +
          this.dr_username +
          '","oldPassword": "' +
          this.old_password +
          '","newPassword":"' +
          hash +
          '"}';
        let dJson;
        this.patientService.commonChangePassword(resJson).subscribe(
          (res: any) => {
            dJson = res;
          },
          (error) => {
            this.functionsService.sorryDoc();
          },
          () => {
            if (dJson.Message == 'Success') {
              this.modalController.dismiss(hashedPassword, this.NewPassword);
            } else {
              this.modalController.dismiss('Error');
            }
          }
        );
      });
    }
    /*
    bcrypt.hash(resultJson.data, this.saltRounds).then(
      (hash) => {let resJson = '{"appCode": "DPP","username": "'+this.postData.username+'","oldPassword": "1234","newPassword":"'+hash+'"}';let dJson;
        this.patientService.mockChangePassword(resJson).subscribe(
          (res: any) => {dJson = res;},(error)=>{this.functionsService.sorryDoc();},
          () => {
            if(dJson.Message == 'Success'){this.hashedPassword = hash;this.loginUser();}
            else{this.functionsService.sorryDoc();}
          });
      }
    );
*/
  }
}
