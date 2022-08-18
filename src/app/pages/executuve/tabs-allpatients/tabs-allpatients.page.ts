import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../../shared/constants';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import {
  UserSettingsModelv3,
  LoginResponseModelv3,
  PatientDetail,
} from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { PatientdetailComponent } from '../components/patientdetail/patientdetail.component';
import { FunctionsService } from '../../../shared/functions/functions.service'; //"@ionic/angular";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tabs-allpatients',
  templateUrl: './tabs-allpatients.page.html',
  styleUrls: ['./tabs-allpatients.page.scss'],
})
export class TabsAllpatientsPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public logindata: LoginResponseModelv3;
  listOfPatients: any;
  searchBar: any = '';
  listOfPatientsFullList: any;
  listOfPatientsTempList: any;
  siteC = 'Cebu';
  siteM = 'Mandaue';
  segmentModel: any;
  refreshcounter: any;
  isReady: boolean = false;
  patientDetail: PatientDetail;
  constructor(
    private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public functionsService: FunctionsService,
    public alertController: AlertController
  ) {
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          // Reload because our routing is out of place
          //window.location.reload();
        }

        this.isDesktop = isDesktop;
      });
  }

  ngOnInit() {
    this.ngUnsubscribe = new Subject();
    ////console.log('ngOnInit');
    this.listOfPatients = [];
    this.refreshcounter = 1;
    this.isReady = false;

    this.listOfPatients = [];
    let rawList;
    this.executiveService
      .getPatients()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          rawList =
            this.listOfPatientsTempList =
            this.listOfPatientsFullList =
              res;
        },
        (error) => {
          this.isReady = true;
        },
        () => {
          this.isReady = true;
          this.filterList();
          this.segmentModel = 'ALL';
          this.segmentChanged();
        }
      );
  }
  initialload() {
    let i = 1;
    this.listOfPatientsTempList = [];
    this.listOfPatientsTempList = this.listOfPatientsFullList;
    this.listOfPatients = this.listOfPatientsFullList.slice(0, 10);
  }

  loading: any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 20000,
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    ////console.log('Loading dismissed!');
  }
  public async dismissLoading(): Promise<void> {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  segmentChanged() {
    this.refreshcounter = 1;
    this.searchBar = '';
    this.listOfPatientsTempList = [];
    if (this.segmentModel == 'ALL') {
      this.listOfPatients = [];
      this.initialload();
    } else {
      this.listOfPatients = [];

      let templistofpatients = this.listOfPatientsFullList.filter(
        (x) => x.status == this.segmentModel
      );
      this.listOfPatientsTempList = templistofpatients;
      this.listOfPatients = templistofpatients.slice(0, 10);
    }
  }
  loadData(event) {
    this.refreshcounter++;
    // Using settimeout to simulate api call
    setTimeout(() => {
      // load more data
      this.listOfPatients = this.listOfPatients.concat(
        this.listOfPatientsTempList.slice(
          this.refreshcounter * 10 - 10,
          this.refreshcounter * 10
        )
      );

      //Hide Infinite List Loader on Complete
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  }
  filterList() {
    ////////console.log('filterList');

    if (this.searchBar == '') {
      ////////console.log('empty');

      this.listOfPatients = [];
      this.initialload();
    } else {
      this.listOfPatients = [];
      /*
      this.listOfPatientsFullList.forEach((element) => {
        if (
          element.patientName
            .toLowerCase()
            .includes(this.searchBar.toLowerCase())
        ) {
          this.listOfPatients.push(element);
        }
      });*/

      this.listOfPatientsTempList = this.listOfPatientsFullList.filter((x) =>
        x.patientName.toLowerCase().includes(this.searchBar.toLowerCase())
      );
      this.listOfPatients = this.listOfPatientsTempList.slice(0, 10);
    }
  }
  settings() {
    this.router.navigate(['/executive/settings']);
  }
  doRefresh(event) {
    this.searchBar = '';
    setTimeout(() => {
      this.ngOnInit();
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter() {
    ////console.log('ionViewWillEnter');
  }
  checkInput() {
    this.doctorService
      .refreshTokenV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        //////////console.log(res);
      });
  }
  async detail(x: any, y: any) {
    //
    /* this.patientDetail = new PatientDetail();
    this.patientDetail.admissionNo = x;
    this.patientDetail.doctorCode = y;
    this.showModal(this.patientDetail);*/

    ////console.log(this.patientDetail);

    this.router.navigate([this.router.url + '/' + y + '/' + x]);

    /*
    this.presentLoading();
    let responsebe=[];
    this.executiveService.getPatientDetail(this.patientDetail).subscribe(
      (res: any) => {   
        responsebe=res;
      },
      (error) => {
        console.log(error);
        
       this.dismissLoading();
      },
      () => {
        if(responsebe==null){
          console.log('if');
          
          this.dismissLoading();
          this.alert('No Data Available','Okay');
        }else{
          console.log('else');
          this.dismissLoading();
          this.showModal(responsebe,y);
        }

      }
    );
  */

    //localStorage.setItem('patientdetails',btoa(JSON.stringify(x)));
  }

  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: data1,
      backdropDismiss: false,
      buttons: [
        {
          text: data2,
          handler: () => {
            this.doRefresh('');
          },
        },
      ],
    });
    await alert.present();
  }

  async showModal(responsebe: any) {
    console.log('responsebe', responsebe);

    const modal = await this.modalController.create({
      component: PatientdetailComponent,
      cssClass: 'my-custom-modal',
      componentProps: {
        patientdetail: responsebe,
        fromPatientList: true,
      },
    });
    return await modal.present();
  }

  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
