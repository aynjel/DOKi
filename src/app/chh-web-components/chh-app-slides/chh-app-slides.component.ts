import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chh-app-slides',
  templateUrl: './chh-app-slides.component.html',
  styleUrls: ['./chh-app-slides.component.scss'],
})
export class ChhAppSlidesComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { }

  ngOnInit() {}

}
