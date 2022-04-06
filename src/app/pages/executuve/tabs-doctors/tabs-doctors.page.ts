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
  InpatientDetails,
  DoctorDetails,
} from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { ModalController } from '@ionic/angular';
import { DoctordetailComponent } from '../components/doctordetail/doctordetail.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tabs-doctors',
  templateUrl: './tabs-doctors.page.html',
  styleUrls: ['./tabs-doctors.page.scss'],
})
export class TabsDoctorsPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public logindata: LoginResponseModelv3;
  listOfDoctors: any;
  searchBar: any = '';
  listOfDoctorsTemp: any;
  listOfDoctorsTemp1: any;
  refreshcounter: any;
  deptFilter: boolean = false;
  segmentModel: any;
  inpatientDetails: InpatientDetails = new InpatientDetails();
  doctorDetails: DoctorDetails = new DoctorDetails();
  constructor(
    private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute
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

  settings() {
    this.router.navigate(['/executive/settings']);
  }
  ionViewWillEnter() {
    this.ngUnsubscribe = new Subject();
    //console.log('ngOnInit');
    this.listOfDoctors = [];
    this.refreshcounter = 1;
    this.isReady = false;

    this.executiveService
      .getDoctors()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.listOfDoctorsTemp = this.listOfDoctorsTemp1 = res;
          //localStorage.setItem('listOfDoctors',JSON.stringify(this.listOfDoctorsTemp));
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
    //console.log(this.refreshcounter);
  }
  filterList() {
    if (this.searchBar == '') {
      this.listOfDoctors = [];
      this.initialload();
    } else {
      this.listOfDoctors = [];
      this.listOfDoctorsTemp1 = [];
      this.listOfDoctorsTemp.forEach((element) => {
        if (
          element.doctorName
            .toLowerCase()
            .includes(this.searchBar.toLowerCase())
        ) {
          this.listOfDoctors.push(element);
          this.listOfDoctorsTemp1.push(element);
        }
      });
    }
  }
  segmentChanged() {
    this.refreshcounter = 1;
    this.searchBar = '';
    //console.log(da.detail.value);
    if (this.segmentModel == 'ALL') {
      this.listOfDoctors = [];
      this.initialload();
    } else {
      this.listOfDoctors = [];
      this.listOfDoctorsTemp1 = [];
      let x = 1;
      this.listOfDoctorsTemp.forEach((element) => {
        if (this.segmentModel == 'SUR') {
          if (
            element.deptCode.toLowerCase() == 'sura' ||
            element.deptCode.toLowerCase() == 'surp'
          ) {
            if (x <= 10) {
              this.listOfDoctors.push(element);
            }
            this.listOfDoctorsTemp1.push(element);
            x++;
          }
        } else {
          if (element.deptCode == this.segmentModel) {
            if (x <= 10) {
              this.listOfDoctors.push(element);
            }
            this.listOfDoctorsTemp1.push(element);
            x++;
          }
        }
      });
    }
  }

  doRefresh(event) {
    this.searchBar = '';
    setTimeout(() => {
      this.ngOnInit();
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  isReady: boolean = false;
  ngOnInit() {
    //console.log('ionViewWillEnter');

    localStorage.removeItem('drdetails');
    localStorage.removeItem('patientdetails');
  }
  checkInput() {
    this.doctorService
      .refreshTokenV3()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        //////console.log(res);
      });
  }
  async detail(data: any) {
    /*console.log(data);
    localStorage.setItem('drdetails',btoa(JSON.stringify(data)));
    this.router.navigate(['executive/doctors/'+data.doctorCode]);*/
    //console.log( this.activatedRoute.snapshot.params.id);
    //console.log(data);

    //localStorage.setItem('patientdetails',btoa(JSON.stringify(x)));
    const modal = await this.modalController.create({
      component: DoctordetailComponent,
      cssClass: 'my-custom-modal',
      componentProps: {
        doctorDetail: data,
        drcode: this.activatedRoute.snapshot.params.id,
      },
    });
    return await modal.present();
  }

  initialload() {
    //console.log('initialload');

    let i = 1;
    this.listOfDoctorsTemp1 = [];
    this.listOfDoctorsTemp1 = this.listOfDoctorsTemp;
    /*this.listOfDoctorsTemp.forEach((element) => {
      //console.log(element.deptCode);
      if (i <= 10) {
        this.listOfDoctors.push(element);
      }

      i++;
    });*/

    this.listOfDoctors = this.listOfDoctorsTemp.slice(0, 10);
  }
  loadData(event) {
    this.refreshcounter++;
    // Using settimeout to simulate api call
    setTimeout(() => {
      // load more data
      this.listOfDoctors = this.listOfDoctors.concat(
        this.listOfDoctorsTemp1.slice(
          this.refreshcounter * 10 - 10,
          this.refreshcounter * 10
        )
      );
      /*
      let i = 1;
      this.listOfDoctorsTemp1.forEach((element) => {
        if (
          i > this.refreshcounter * 10 - 10 &&
          i <= this.refreshcounter * 10
        ) {
          this.listOfDoctors.push(element);
        }
        i++;
      });
*/
      //Hide Infinite List Loader on Complete
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.listOfDoctors.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
