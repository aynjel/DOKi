import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chh-app-chief-complaint',
  templateUrl: './chh-app-chief-complaint.component.html',
  styleUrls: ['./chh-app-chief-complaint.component.scss'],
})
export class ChhAppChiefComplaintComponent implements OnInit {
  @Input() chiefComplaint: string;

  constructor() { }

  ngOnInit() {}

}
