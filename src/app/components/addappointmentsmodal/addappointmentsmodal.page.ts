import { Component, OnInit } from '@angular/core';
import { ScreensizeService } from '../../services/screensize.service';
@Component({
  selector: 'app-addappointmentsmodal',
  templateUrl: './addappointmentsmodal.page.html',
  styleUrls: ['./addappointmentsmodal.page.scss'],
})
export class AddappointmentsmodalPage implements OnInit {
  isDesktop: boolean;
  constructor(private screensizeService: ScreensizeService) { this.screensizeService.isDesktopView().subscribe(isDesktop => {
    if (this.isDesktop && !isDesktop) {window.location.reload();}this.isDesktop = isDesktop;
  });}

  ngOnInit() {
  }

}
