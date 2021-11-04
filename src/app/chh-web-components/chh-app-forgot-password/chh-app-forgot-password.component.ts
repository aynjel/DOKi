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
    this.doctorService.forgotPasswordV3(this.forgotPasswordV3).subscribe((res: any) => {
      console.log(res);
      
    },(error) => {
      this.btnDisable = false;
    },() => {
      this.btnDisable = false;
      this.alert('We have received your request, Kindly check your E-mail','Okay');

    }
    );
    
  }
  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: data1,
      backdropDismiss: false,
      buttons: [{ text: data2, handler: (
        
      ) => {
        this.modalController.dismiss('none');

      } }],
    });
    await alert.present();
  }
}
