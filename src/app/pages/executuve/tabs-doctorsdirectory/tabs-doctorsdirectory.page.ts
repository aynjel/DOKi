import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonList } from '@ionic/angular';
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

import { DoctordirectorydetailComponent } from '../components/doctordirectorydetail/doctordirectorydetail.component';
import { FunctionsService } from '../../../shared/functions/functions.service'; //"@ionic/angular";

@Component({
  selector: 'app-tabs-doctorsdirectory',
  templateUrl: './tabs-doctorsdirectory.page.html',
  styleUrls: ['./tabs-doctorsdirectory.page.scss'],
})
export class TabsDoctorsdirectoryPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  isDesktop: boolean;
  dateToday: any = '12/31/2021';
  listOfDoctors: any = [];
  listOfDoctorsTemp300: any;
  listOfDoctorsTemp1: any;
  listOfDoctorsTemp2: any;
  searchBar: any = '';
  responseData: any;
  segmentModel: any = 'Clean ER';
  segmentModel1: any = 'ALL';
  maxTime: any;
  showSkeleton: boolean = false;
  noData: boolean = false;
  refreshcounter: any;
  listlength: any;
  isReady: any = false;
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
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    this.refreshcounter = 1;
    this.getDocotrsDirectory();
  }
  doRefresh(event) {
    this.listOfDoctors = [];
    this.isReady = true;
    this.searchBar = '';
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
  getDocotrsDirectory() {
    this.isReady = true;
    this.listOfDoctors = [];
    this.showSkeleton = true;
    this.noData = false;
    this.executiveService.getDoctorsDirectory().subscribe(
      (res: any) => {
        //console.log(res);
        this.listOfDoctorsTemp1 = res;
        this.listOfDoctorsTemp300 = res;
        //console.log(this.listOfDoctorsTemp300);
        this.isReady = false;
      },
      (error) => {},
      () => {
        if (this.listOfDoctorsTemp300 != []) {
          this.listlength = this.listOfDoctorsTemp300.lenth;
          //console.log(this.listlength);
          //console.log(this.listOfDoctorsTemp300);
        }
        this.initialload();
      }
    );
  }
  loadData(event) {
    this.refreshcounter++;
    setTimeout(() => {
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
      event.target.complete();
      if (this.listOfDoctors.length == this.listlength) {
        event.target.disabled = true;
      }
    }, 500);
  }
  initialload() {
    //console.log('initialload');
    //console.log(this.listOfDoctorsTemp300);
    ////console.log('initialload');
    this.refreshcounter = 1;
    this.listOfDoctors = [];
    this.isReady = true;
    let i = 1;
    this.listOfDoctorsTemp1 = [];
    //console.log(this.listOfDoctorsTemp300);
    let asdasd = this.listOfDoctorsTemp300;
    asdasd.forEach((ex) => {
      if (i <= 10) {
        this.listOfDoctors.push(ex);
      }
      this.listOfDoctorsTemp1.push(ex);
      i++;
    });
    //console.log('initialloadends');
    //console.log(this.listOfDoctorsTemp300);
    //console.log('initialloadends');
    this.isReady = false;
  }
  segmentChanged() {
    //console.log('segmentChanged');
    this.content.scrollToTop();
    this.refreshcounter = 1;
    this.searchBar = '';
    //////console.log(da.detail.value);
    if (this.segmentModel == 'ALL') {
      this.listOfDoctors = [];
      this.initialload();
    } else {
      this.listOfDoctors = [];
      this.listOfDoctorsTemp1 = [];
      let x = 1;
      this.listOfDoctorsTemp300.forEach((element) => {
        if (element.deptCode == this.segmentModel) {
          if (x <= 10) {
            this.listOfDoctors.push(element);
          }
          this.listOfDoctorsTemp1.push(element);
          x++;
        }
      });
    }
  }
  filterList() {
    this.isReady = true;
    //console.log('filter list');

    this.refreshcounter = 1;
    this.listOfDoctors = [];
    this.listOfDoctorsTemp1 = [];
    if (this.searchBar == '') {
      this.initialload();
    } else {
      this.listOfDoctorsTemp300.forEach((el) => {
        //console.log('found1');
        let fnamelname =
          el.firstName.toLowerCase() + ' ' + el.lastName.toLowerCase();
        let lnamefname =
          el.lastName.toLowerCase() + ' ' + el.firstName.toLowerCase();
        if (
          el.firstName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
          el.middleName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
          el.lastName.toLowerCase().includes(this.searchBar.toLowerCase()) ||
          fnamelname.includes(this.searchBar.toLowerCase()) ||
          lnamefname.includes(this.searchBar.toLowerCase())
        ) {
          ////console.log('found');

          let x = 1;
          if (x <= 10) {
            this.listOfDoctors.push(el);
          }
          this.listOfDoctorsTemp1.push(el);
          x++;
        }
      });
      this.isReady = false;
    }
  }
  settings() {
    this.router.navigate(['/executive/settings']);
  }
  detail(mdCode, firstname, middleName, lastName) {
    console.log(mdCode);
    console.log(firstname);
    console.log(middleName);
    console.log(lastName);
    this.showModal(mdCode, firstname, middleName, lastName);
  }
  async showModal(
    responsebe: any,
    firstname: any,
    middleName: any,
    lastName: any
  ) {
    const modal = await this.modalController.create({
      component: DoctordirectorydetailComponent,
      cssClass: 'my-custom-modal',
      componentProps: {
        mdcode: responsebe,
        firstname: firstname,
        middleName: middleName,
        lastName: lastName,
      },
    });
    return await modal.present();
  }
}
