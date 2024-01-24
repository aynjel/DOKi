import { Component, OnInit, Input } from "@angular/core";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";

@Component({
  selector: 'app-chh-app-patient-emos-header',
  templateUrl: './chh-app-patient-emos-header.component.html',
  styleUrls: ['./chh-app-patient-emos-header.component.scss'],
})
export class ChhAppPatientEmosHeaderComponent implements OnInit {

  @Input() erStatus: any = "Admitted";
  @Input() data: any;
  @Input() dateAdmitted: any;
  @Input() dischargeNotice: any;
  @Input() forMoreOrLess: boolean;
  @Input() is_pwd: any = "N";
  @Input() is_senior: any = "N";
  @Input() is_philhealth_membership;
  @Input() patientDetailfromApi_from;
  @Input() patientDetailfromApi_to;
  @Input() admission_status;
  @Input() showPFDetals: boolean = true;
  isDesktop: any;
  moreOrLess: boolean = true;
  role_flag;
  constructor(private screensizeService: ScreenSizeService) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
      //console.log(this.isDesktop);
    });
    //console.log(this.isDesktop);
  }
  ionViewWillEnter() {}
  ngOnInit() {
    this.role_flag = localStorage.getItem("role_flag");
    if (this.forMoreOrLess) {
      this.moreOrLess = !this.forMoreOrLess;
    }
  }

  moreorless(data) {
    this.moreOrLess = data;
  }
}
