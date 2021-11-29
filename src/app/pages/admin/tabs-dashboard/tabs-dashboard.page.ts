import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthConstants, Consta } from '../../../config/auth-constants';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from '../../../shared/constants';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-tabs-dashboard',
  templateUrl: './tabs-dashboard.page.html',
  styleUrls: ['./tabs-dashboard.page.scss'],
})
export class TabsDashboardPage implements OnInit {
  isDesktop: boolean;
  userData$ = new BehaviorSubject<any>([]);
  constructor(    private storageService: StorageService,
    private router: Router,
    public constants: Constants,
    private screensizeService: ScreenSizeService,
    private doctorService: DoctorService
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
  }
  checkInput(){
    this.doctorService.refreshTokenV3().subscribe((res: any) => {
      //console.log(res);
    });
  }
}
