import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Constants } from 'src/app/shared/constants';
import { BehaviorSubject } from 'rxjs';
import {UserSettingsModelv3,LoginResponseModelv3,InpatientDetails,DoctorDetails} from 'src/app/models/doctor';
import { ModalController } from '@ionic/angular';
import{PatientDetailPage} from '../patient-detail/patient-detail.page';
import {PatientdetailComponent} from "../../components/patientdetail/patientdetail.component";
@Component({
  selector: 'app-doctordetails',
  templateUrl: './doctordetails.page.html',
  styleUrls: ['./doctordetails.page.scss'],
})
export class DoctordetailsPage implements OnInit {
  isDesktop: boolean;
  public logindata: LoginResponseModelv3;
  inpatientDetails:InpatientDetails = new InpatientDetails();
  doctorDetails:DoctorDetails = new DoctorDetails(); 
  userData$ = new BehaviorSubject<any>([]);
  dr_details:any;
  dr_name:any;
  deptName:any;
  listOfPatients:any;
  constructor(private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService,
    private modalController:ModalController,
    private activatedRoute: ActivatedRoute) {       this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });}

  ngOnInit() {
    this.dr_details = JSON.parse(atob(localStorage.getItem('drdetails')));
    console.log(this.dr_details);
    
    this.deptName = this.dr_details.deptName;

    this.dr_name = this.dr_details.doctorName;

  }
  async detail(x){
    console.log( this.activatedRoute.snapshot.params.id);
  
    
    localStorage.setItem('patientdetails',btoa(JSON.stringify(x)));
    const modal = await this.modalController.create({
      component: PatientdetailComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'patientdetail': x,
        'drcode':this.activatedRoute.snapshot.params.id,
      }
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

    this.logindata = <LoginResponseModelv3>this.authService.userData$.getValue();



    this.doctorDetails.doctorCode = this.dr_details.doctorCode;


    this.executiveService.geInpatients(this.doctorDetails).subscribe(
      (res: any) => {   
  
        this.listOfPatients  = res;
     
      },
      (error) => {},
      () => {

      }
    );
    
  }

}
