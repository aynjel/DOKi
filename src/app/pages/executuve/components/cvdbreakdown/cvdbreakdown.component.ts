import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-cvdbreakdown',
  templateUrl: './cvdbreakdown.component.html',
  styleUrls: ['./cvdbreakdown.component.scss'],
})
export class CvdbreakdownComponent implements OnInit {
  @Input() cvd: any = 0;
  @Input() ncvd: any = 0;
  @Input() site: any = "";
  @Input() critNcrit: any = "";

  constructor() { }

  ngOnInit() {}
  detail(CritnCrit,site,CvdnCvd) {
    console.log(CritnCrit+' | '+site + ' | '+CvdnCvd);
    
  }
}
