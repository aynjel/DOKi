import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';

@Component({
  selector: 'app-chh-app-final-diagnosis',
  templateUrl: './chh-app-final-diagnosis.component.html',
  styleUrls: ['./chh-app-final-diagnosis.component.scss'],
})
export class ChhAppFinalDiagnosisComponent implements OnInit {
  @Input() finalDiagnosisApproval: any;
  @Input() isCancelFinalDiagnosisApproval: any;
  @Input() data: any;
  @Input() patientName: any;
  @Input() finalDiagnosis: any;
  @Input() limit: any;
  @Input() truncating: any;
  @Input() finalDiagnosis1: any;
  @Input() finalDiagnosis2: any;
  @Output() cancelApproval: EventEmitter<any> = new EventEmitter();
  isDesktop: any;
  constructor(
    private screensizeService: ScreenSizeService,
    public actionSheetController: ActionSheetController
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    console.log(this.finalDiagnosisApproval);
  }
  approvePendingAPproval() {
    this.presentActionSheet();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header:
        'Are you sure to cancel ' +
        this.patientName +
        "'s final diagnosis approval?",
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Yes, Cancel',
          icon: 'trash',
          id: 'delete-button',
          data: {
            type: 'delete',
          },
          handler: () => {
            this.cancelApproval.emit(
              this.finalDiagnosisApproval[0].discharge_no
            );
          },
        },

        {
          text: 'Back',
          icon: 'arrow-back-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
