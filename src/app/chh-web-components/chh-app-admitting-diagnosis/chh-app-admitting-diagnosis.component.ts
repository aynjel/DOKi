import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';

@Component({
  selector: 'app-chh-app-admitting-diagnosis',
  templateUrl: './chh-app-admitting-diagnosis.component.html',
  styleUrls: ['./chh-app-admitting-diagnosis.component.scss'],
})
export class ChhAppAdmittingDiagnosisComponent implements OnInit {
  @Input() admittingDiagnosis: any;
  @Input() admittingDiagnosis1: any;
  @Input() admittingDiagnosis2: any;
  @Input() truncating1: any;
  isDesktop:any;
  constructor(private screensizeService: ScreenSizeService) { 

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}

}
