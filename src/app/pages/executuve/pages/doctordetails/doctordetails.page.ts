import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Constants } from 'src/app/shared/constants';
import { BehaviorSubject } from 'rxjs';
import {UserSettingsModelv3,LoginResponseModelv3,InpatientDetails,DoctorDetails} from 'src/app/models/doctor';
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
    private executiveService: ExecutiveService) {       this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        //window.location.reload();
      }

      this.isDesktop = isDesktop;
    });}

  ngOnInit() {
  }
  detail(x){
    console.log(x);
    localStorage.setItem('patientdetails',btoa(JSON.stringify(x)));
    this.router.navigate(['executive/patient/'+x.admission_no]);
    
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

    this.dr_details = JSON.parse(atob(localStorage.getItem('drdetails')));
    this.deptName = this.dr_details.deptName;

    this.dr_name = this.dr_details.doctorName;
    this.doctorDetails.doctorCode = this.dr_details.doctorCode;


    this.executiveService.geInpatients(this.doctorDetails).subscribe(
      (res: any) => {   
        console.log(res);
        this.listOfPatients  = res;
     
      },
      (error) => {},
      () => {

      }
    );
    
  }

}
