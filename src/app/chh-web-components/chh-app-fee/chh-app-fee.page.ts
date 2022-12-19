import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginData } from 'src/app/models/login-data.model';
//import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { FunctionsService } from '../../shared/functions/functions.service';
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
} from 'src/app/models/doctor';
import {
  InPatientData,
  ProfessionalFeeModelv3,
} from 'src/app/models/in-patient.model';
@Component({
  selector: 'chh-app-fee',
  templateUrl: './chh-app-fee.page.html',
  styleUrls: ['./chh-app-fee.page.scss'],
})
export class ChhAppFeePage implements OnInit {
  public initialFeePopOverProfFee: string = '';
  public initialFeePopOverRemarks: string = '';
  public initialFeePopOverMethod: string = '';
  public disableSaveBtn = false;
  public logindata: LoginResponseModelv3;
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public dr_name: any;
  public postData = {
    professionalFee: '',
    remarks: '',
    method: 'NOTHING',
    cancel: true,
  };
  @Input() professionalFee: any;
  @Input() remarks: any;
  @Input() method: any;

  constructor(
    private modalController: ModalController,
    private popover: PopoverController,
    private authService: AuthService,

    private actionSheetController: ActionSheetController,
    public functionsService: FunctionsService
  ) {}

  ngOnInit() {
    this.initialFeePopOverProfFee = this.professionalFee;
    this.initialFeePopOverRemarks = this.remarks;
    this.initialFeePopOverMethod = this.method;

    this.logindata = <LoginResponseModelv3>(
      this.authService.userData$.getValue()
    );
    this.dr_name = this.logindata.lastName;
  }

  ClosePopover() {
    // Get initial value.

    this.postData.professionalFee = this.initialFeePopOverProfFee;
    this.postData.remarks = this.initialFeePopOverRemarks;
    this.postData.method = 'NOTHING'; // Explicit this.postData.method = this.initialFeePopOverMethod;
    this.postData.cancel = true;

    this.popover.dismiss(this.postData);
  }

  feeInputChanged() {
    let feePopOverProfFeeInput = (<HTMLInputElement>(
      document.getElementById('input-professionalFee')
    )).value;

    let feePopOverRemarksInput = (<HTMLInputElement>(
      document.getElementById('input-remarks')
    )).value;

    if (
      (this.initialFeePopOverProfFee == feePopOverProfFeeInput &&
        this.initialFeePopOverRemarks == feePopOverRemarksInput) ||
      ((feePopOverProfFeeInput == '' || feePopOverProfFeeInput == null) &&
        this.remarks != feePopOverRemarksInput) ||
      (feePopOverProfFeeInput == '0' && this.method != '')
    ) {
      this.disableSaveBtn = false;
    } else this.disableSaveBtn = true;
  }

  save() {
    let feePopOverMethod = '';

    let feePopOverProfFee = (<HTMLInputElement>(
      document.getElementById('input-professionalFee')
    )).value;

    let feePopOverRemarks = (<HTMLInputElement>(
      document.getElementById('input-remarks')
    )).value;

    if (this.method == 'POST') {
      feePopOverMethod = 'POST';
    } else if (
      //this.professionalFee == feePopOverProfFee &&
      //this.remarks == feePopOverRemarks
      this.initialFeePopOverProfFee == feePopOverProfFee &&
      this.initialFeePopOverRemarks == feePopOverRemarks
    ) {
      feePopOverMethod = 'NOTHING';
    } else if (
      this.method == '' &&
      feePopOverProfFee != '0' &&
      feePopOverProfFee != ''
    ) {
      feePopOverMethod = 'PUT';
    } else if (
      (this.method == '' && feePopOverProfFee == '0') ||
      feePopOverProfFee == ''
    ) {
      feePopOverMethod = 'DELETE';
    } else if (this.method == '' && feePopOverProfFee == '') {
      feePopOverMethod = 'NOTHING';
    } else if (
      this.method == 'POST' &&
      (this.professionalFee == null || feePopOverProfFee == '')
    ) {
      feePopOverMethod = 'NOTHING';
    }

    let postData = {
      professionalFee: feePopOverProfFee,
      remarks: feePopOverRemarks,
      method: feePopOverMethod,
      cancel: false,
    };
    this.actionSheet(feePopOverProfFee, postData);
    //this.popover.dismiss(postData);
  }

  async actionSheet(feePopOverProfFee: any, postData: any) {
    var newVal = feePopOverProfFee;
    // var newVal = this.functionsService.numberWithCommas(feePopOverProfFee);

    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Please review and confirm.',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes. P' + newVal,
          icon: 'share-outline',
          handler: () => {
            this.popover.dismiss(postData);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'destructive',
          handler: () => {
            //this.ClosePopover();
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
