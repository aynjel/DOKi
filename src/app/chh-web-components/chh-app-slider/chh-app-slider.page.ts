import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chh-app-slider',
  templateUrl: './chh-app-slider.page.html',
  styleUrls: ['./chh-app-slider.page.scss'],
})
export class ChhAppSliderPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { }

  ngOnInit() {
  }

}
