import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Constants } from 'src/app/shared/constants';
import { BehaviorSubject } from 'rxjs';
import { UserSettingsModelv3, LoginResponseModelv3, InpatientDetails, DoctorDetails } from 'src/app/models/doctor';
import { ModalController } from '@ionic/angular';

import { PatientdetailComponent } from "../../components/patientdetail/patientdetail.component";

@Component({
  selector: 'app-doctordetail',
  templateUrl: './doctordetail.component.html',
  styleUrls: ['./doctordetail.component.scss'],
})
export class DoctordetailComponent implements OnInit {
  @Input() doctorDetail: any;
  isDesktop: boolean;
  public logindata: LoginResponseModelv3;
  inpatientDetails: InpatientDetails = new InpatientDetails();
  doctorDetails: DoctorDetails = new DoctorDetails();
  userData$ = new BehaviorSubject<any>([]);
  dr_details: any;
  dr_name: any;
  deptName: any;
  expertise:any;
  listOfPatients: any;
  isReady:boolean = false;
  constructor(private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute) {
      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          // Reload because our routing is out of place
          //window.location.reload();
        }

        this.isDesktop = isDesktop;
      });
  }

  ngOnInit() {
    this.dr_details = this.doctorDetail;
  
    this.deptName = this.dr_details.deptName;
    this.expertise = this.dr_details.expertise;
    
    this.dr_name = this.dr_details.doctorName;

    this.isReady = false;
    let rawList=[];
    this.listOfPatients=[];
    this.doctorDetails.doctorCode = this.dr_details.doctorCode;
    this.executiveService.geInpatients(this.doctorDetails).subscribe(
      (res: any) => {
        rawList = res;
      },
      (error) => {   this.isReady = true;},
      () => {
       /* rawList.forEach(element => {
          if(element.forDischargeDateTime != null){
            console.log(element.forDischargeDateTime);
            let d = new Date(element.forDischargeDateTime);
            element.forDischargeDateTime = d.toLocaleString();
          }

          this.listOfPatients.push(element);
        });*/
        this.listOfPatients = rawList;
        this.isReady = true;
      }
    );
  }
  async detail(x) {
    this.modalController.getTop().then((res)=>{
      if(res){
        
        this.modalController.dismiss({
          'dismissed': true
        });
      }
    });
    const modal = await this.modalController.create({
      component: PatientdetailComponent,
      cssClass: 'my-custom-modal-c',
      componentProps: {
        'patientdetail': x,
        'drcode': this.activatedRoute.snapshot.params.id,
        'doctorDetail':this.doctorDetail
      },
      animated:false
    });
    return await modal.present();
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter() {

  }
  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
