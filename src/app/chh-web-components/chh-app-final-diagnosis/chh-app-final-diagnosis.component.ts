import { Component, OnInit, Input } from '@angular/core';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';

@Component({
  selector: 'app-chh-app-final-diagnosis',
  templateUrl: './chh-app-final-diagnosis.component.html',
  styleUrls: ['./chh-app-final-diagnosis.component.scss'],
})
export class ChhAppFinalDiagnosisComponent implements OnInit {
  @Input() data: any;
  @Input() finalDiagnosis: any;
  @Input() limit: any;
  @Input() truncating: any;
  @Input() finalDiagnosis1: any;
  @Input() finalDiagnosis2: any;
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
