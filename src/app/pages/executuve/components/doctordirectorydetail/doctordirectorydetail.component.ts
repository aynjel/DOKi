import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2,
  HostListener,
} from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ExecutiveService } from 'src/app/services/executive/executive.service';

@Component({
  selector: 'app-doctordirectorydetail',
  templateUrl: './doctordirectorydetail.component.html',
  styleUrls: ['./doctordirectorydetail.component.scss'],
})
export class DoctordirectorydetailComponent implements OnInit {
  loading: any;
  information: any = [];
  @Input() mdcode: any;
  @Input() firstname: any;
  @Input() middleName: any;
  @Input() lastName: any;
  @Input() gender: any;
  jsonData = {
    doctorCode: 'string',
  };
  constructor(
    public loadingController: LoadingController,
    public modalController: ModalController,
    public executiveService: ExecutiveService
  ) {}

  ngOnInit() {
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
    //console.log(this.gender);
    this.jsonData.doctorCode = this.mdcode;
    this.executiveService.getDoctorInfo(this.jsonData).subscribe(
      (res: any) => {
        this.information = JSON.parse('[' + JSON.stringify(res) + ']');
      },
      (error) => {},
      () => {
        //console.log(this.information);
      }
    );
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    ////////////console.log('Loading dismissed!');
  }
  async closemodal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }
}
