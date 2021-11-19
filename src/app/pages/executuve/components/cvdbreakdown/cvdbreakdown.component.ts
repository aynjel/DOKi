import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-cvdbreakdown',
  templateUrl: './cvdbreakdown.component.html',
  styleUrls: ['./cvdbreakdown.component.scss'],
})
export class CvdbreakdownComponent implements OnInit {
  @Input() cvd: any = 0;
  @Input() ncvd: any = 0;
  constructor() { }

  ngOnInit() {}

}
