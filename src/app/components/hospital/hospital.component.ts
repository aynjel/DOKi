import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  @Output() hospital: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {}
  onSubmit(data1:any) {
    console.log('submit clicked');
    this.hospital.emit(data1);
  }
}
