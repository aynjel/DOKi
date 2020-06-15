import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  segment = "all";

  private accounts = [{
    id: '1',
    name : 'ERASMO, CEFERINA ROSALES',
    dateAdmitted  : '05-31-2020',
    patStat : 'Admitted',
    docStat : 'Consult',
    pfAmt : '0.00',
    remarks : '',
    room: 'ICU04',
    site : 'chhc'
  },{
    id: '2',
    name : 'KANG, ROSITA YU',
    dateAdmitted  : '05-23-2020',
    patStat : 'Admitted',
    docStat : 'Surgeon / Operator',
    pfAmt : '0.00',
    remarks : '',
    room: 'C-743',
    site : 'chhm'
  }
];
  constructor() {}

}
