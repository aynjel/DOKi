import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { ForgotPasswordV3} from '../../models/doctor';
import { DoctorService } from '../../services/doctor/doctor.service';
import { environment } from '../../../environments/environment';
import { Constants } from '../../shared/constants';
@Component({
  selector: 'app-chh-app-forgot-password',
  templateUrl: './chh-app-forgot-password.component.html',
  styleUrls: ['./chh-app-forgot-password.component.scss'],
})
export class ChhAppForgotPasswordComponent implements OnInit {
  forgotPasswordV3 : ForgotPasswordV3;
  btnDisable: boolean = false;
  constructor(
    public modalController: ModalController,
    private doctorService: DoctorService,
    public functionsService: FunctionsService,
    private router: Router,
    public alertController: AlertController,
    public constants: Constants
    
    ) {  this.forgotPasswordV3 = new ForgotPasswordV3();}

  ngOnInit() {
    this.forgotPasswordV3 = new ForgotPasswordV3();
    
   
  }
  async closeModal() {
    await this.modalController.dismiss('none');
  }
  forgotpassword(){
    this.btnDisable = true;
    this.forgotPasswordV3.clientURI = environment.linkRouterUrl+'resetpassword';
    //console.log(this.forgotPasswordV3);
    
    if(this.forgotPasswordV3.doctorCode == null || this.forgotPasswordV3.email == null){
      this.btnDisable = false;
      this.alert('Ooops!','Email and Doctor Code are needed to recover your access.','Okay',false);
    }else{
      this.doctorService.forgotPasswordV3(this.forgotPasswordV3).subscribe(
        (res: any) => {
        },(error) => {
          this.btnDisable = false;
          this.alert('Ooops!','U-oh! Make sure to submit valid information and try again. If problem still persists, please contact the DOKi App Team at doki@chonghua.com.ph.','Okay',false);
        },() => {
          this.btnDisable = false;
          this.alert('Success','We have received your request. Kindly check your email.','Okay',true);
        }
      );
    }
  }
  async alert(data0:any,data1: any, data2: any,data3:boolean) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: data0,
      message: data1,
      buttons: [
       {
          text: data2,
          handler: () => {
            if(data3){
              this.modalController.dismiss('none');
            }
          }
        }
      ]
    });

    await alert.present();
    /*
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header, data0,
      message: data1,
      backdropDismiss: false,
      buttons: [{ text: data2, handler: (
        
      ) => {
        if(data3){
          this.modalController.dismiss('none');
        }


      } }],
    });
    await alert.present();*/
  }
  
}
