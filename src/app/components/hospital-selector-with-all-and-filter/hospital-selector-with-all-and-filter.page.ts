import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { ScreensizeService } from '../../services/screensize.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
@Component({
  selector: 'app-hospital-selector-with-all-and-filter',
  templateUrl: './hospital-selector-with-all-and-filter.page.html',
  styleUrls: ['./hospital-selector-with-all-and-filter.page.scss'],
})
export class HospitalSelectorWithAllAndFilterPage implements OnInit {

  
  active:boolean = false;
  active1:boolean = false;
  active2:boolean = false;
  active3:boolean = true;
  currenturl:any;
  isDesktop: boolean;
  admittedOrDischarge:any="All";
  @Output() hospital: EventEmitter<any> = new EventEmitter();
  constructor(private router:Router,    private screensizeService: ScreensizeService,    private location: Location) {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {window.location.reload();}this.isDesktop = isDesktop;
    });


    if(this.isDesktop){
      router.events.subscribe(val => {
        if (location.path() == "/menu/in-patients") {
      this.admittedOrDischarge = "ALL";
    }else if(location.path() == "/menu/in-patientsAC"){
      this.admittedOrDischarge = "AC";
    }else if(location.path() == "/menu/in-patientsDN"){
      this.admittedOrDischarge = "DN";
    }

    });
    }

  }

  ngOnInit() {} 
  onSubmit(data1:any,data2:boolean) {
    if(data1 == "C"){
      this.active = true;
      this.active1 = false;
      this.active3 = false;
    }
    if(data1 == "M"){
      this.active = false;
      this.active1 = true;
      this.active3 = false;
    }
    if(data1 == "A"){
      this.active = false;
      this.active1 = false;
      this.active3 = true;
    }
    if(data1 == "ALL"){

      if(this.currenturl != data1){
        this.currenturl = data1;
        this.router.navigate(['/menu/in-patients']);
      }
    }else if(data1 == "AC"){
      this.router.navigate(['/menu/in-patientsAC']);
    }else if(data1 == "DN"){
      this.router.navigate(['/menu/in-patientsDN']);
    }
    this.hospital.emit(data1);
  }
  changeRedirect(){

    if(this.admittedOrDischarge == "ALL"){

        this.router.navigate(['/menu/in-patients']);
      
    }else if(this.admittedOrDischarge == "AC"){
      this.router.navigate(['/menu/in-patientsAC']);
    }else if(this.admittedOrDischarge == "DN"){
      this.router.navigate(['/menu/in-patientsDN']);
    }
  }

}
