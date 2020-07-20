import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { }

  ngOnInit() {
  }

}
