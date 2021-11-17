import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
@Component({
  selector: 'app-chh-app-list-of-doctors',
  templateUrl: './chh-app-list-of-doctors.component.html',
  styleUrls: ['./chh-app-list-of-doctors.component.scss'],
})
export class ChhAppListOfDoctorsComponent implements OnInit {
  @Input() coDoctors: any;
  @Input() drCode: any;
  @Input() objecthandler: any;
  @Input() isFetchDone: any;
  @Input() fromExec: any = false;
  isDesktop:any;
  constructor(private screensizeService: ScreenSizeService,private router:Router) { 

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}
  onClick(dr){
    //console.log(':'+this.drCode+':'+dr.dr_code+':');

    

    if(this.drCode != dr.dr_code){
     // console.log(dr.dr_code);
     // this.router.navigate(['executive/doctors/'+dr.dr_code]);
     // console.log( localStorage.getItem('listOfDoctors'));
      

    }
  
    //
  }
}
