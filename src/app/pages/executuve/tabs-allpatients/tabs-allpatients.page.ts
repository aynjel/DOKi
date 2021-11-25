import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../../shared/constants';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import {UserSettingsModelv3,LoginResponseModelv3, PatientDetail} from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExecutiveService } from 'src/app/services/executive/executive.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import {PatientdetailComponent} from "../components/patientdetail/patientdetail.component";
import { FunctionsService } from '../../../shared/functions/functions.service'; //"@ionic/angular";

@Component({
  selector: 'app-tabs-allpatients',
  templateUrl: './tabs-allpatients.page.html',
  styleUrls: ['./tabs-allpatients.page.scss'],
})
export class TabsAllpatientsPage implements OnInit {
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  loginResponseModelv3: LoginResponseModelv3 = new LoginResponseModelv3();
  public logindata: LoginResponseModelv3;
  listOfPatients:any;
  searchBar: any = "";
  listOfPatientsTemp: any;
  listOfPatientsTemp1: any;
  siteC = "Cebu";
  siteM = "Mandaue";
  segmentModel:any;
  refreshcounter:any;
  isReady:boolean = false;
  patientDetail:PatientDetail;
  constructor(    private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private executiveService: ExecutiveService,
    private modalController:ModalController,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public functionsService:FunctionsService,
    public alertController:AlertController
    ) { 

      this.screensizeService.isDesktopView().subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          // Reload because our routing is out of place
          //window.location.reload();
        }
  
        this.isDesktop = isDesktop;
      });

    }


  ngOnInit() {
    ////console.log('ngOnInit');
    this.listOfPatients = [];
    this.refreshcounter=1;  
    this.isReady = false;


    this.listOfPatients = [];
    this.executiveService.getPatients().subscribe(
      (res: any) => {   
        this.listOfPatientsTemp1 = this.listOfPatientsTemp = res;  
          ////////console.log(res);
     
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
  initialload(){
    let i=1;
    this.listOfPatientsTemp1=[];
    this.listOfPatientsTemp1 = this.listOfPatientsTemp;
    this.listOfPatientsTemp.forEach(element => {
      //////console.log(element.status);
      if(i<=10){this.listOfPatients.push(element);}
      
      i++;
    }
    );
  }

  loading:any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 20000

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
  segmentChanged(){
    this.refreshcounter=1;  
    this.searchBar = "";
    this.listOfPatientsTemp1 = [];
    if(this.segmentModel == 'ALL'){
      this.listOfPatients = [];
      this.initialload();
    }else{
      this.listOfPatients = [];
    
      let x =1;
      this.listOfPatientsTemp.forEach(element => {

 
          if (element.status == this.segmentModel) {
            ////console.log(element.status);
            
            if(x<=10){   
              this.listOfPatients.push(element);
            }   
            this.listOfPatientsTemp1.push(element);   
            x++;
          }
      






      });
      
       
    }
    


  }
  loadData(event) {
    this.refreshcounter++;
    // Using settimeout to simulate api call 
    setTimeout(() => {

      // load more data


      let i =1;
      ////console.log(this.listOfPatientsTemp1.length);
      this.listOfPatientsTemp1.forEach(element => {
        if(i > ((this.refreshcounter*10)-10) && i<= (this.refreshcounter*10)){
          this.listOfPatients.push(element);
          ////console.log(element.status);
          
        }
        i++;
      });


      //Hide Infinite List Loader on Complete
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
 
    }, 500);
  }
  filterList() {
    ////////console.log('filterList');
    
    if(this.searchBar == ""){
      ////////console.log('empty');
      
      this.listOfPatients = [];
      this.initialload();
    }else{
      this.listOfPatients = [];
      this.listOfPatientsTemp.forEach(element => {
     
        
        if (element.patientName.toLowerCase().includes(this.searchBar.toLowerCase())) {
            this.listOfPatients.push(element);
        }
      });
    }
  }
  settings(){
    this.router.navigate(['/executive/settings']);
  }
  doRefresh(event) {
    this.searchBar = "";
    setTimeout(() => {
      this.ngOnInit();
      this.ionViewWillEnter();
      event.target.complete();
    }, 1000);
  }
  ionViewWillEnter() {
    ////console.log('ionViewWillEnter');


  }
  checkInput(){
    this.doctorService.refreshTokenV3().subscribe((res: any) => {
      //////////console.log(res);
    });
  }
  async detail(x:any,y:any){
    this.presentLoading();
    this.patientDetail = new PatientDetail();
    this.patientDetail.admissionNo = x;
    this.patientDetail.doctorCode = y;
    ////console.log(this.patientDetail);
    
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
  
    
    //localStorage.setItem('patientdetails',btoa(JSON.stringify(x)));

  }

  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: data1,
      backdropDismiss: false,
      buttons: [{ text: data2, handler: () => {
          this.doRefresh('');
      } }],
    });
    await alert.present();
  }

  async showModal(responsebe:any,y:any){
    const modal = await this.modalController.create({
      component: PatientdetailComponent,
      cssClass: 'my-custom-modal',
      componentProps: {
        'patientdetail': responsebe,
        'drcode':y,
        'fromPatientList':true,
      }
    });
    return await modal.present();
  }


}
