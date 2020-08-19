import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-sm',
  templateUrl: './logo-sm.component.html',
  styleUrls: ['./logo-sm.component.scss'],
})
export class LogoSmComponent implements OnInit {
  logo:any;
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('darkmode') == 'true'){
      console.log("true");
      this.logo = "assets/img/orgwidelogosupergraphic.png";
    }else{
      console.log("false");
      this.logo = "assets/img/orgwidelogo.png";
    }
  }

}
