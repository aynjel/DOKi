import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit {
  @Output() hospitals: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  onSubmit() {
    console.log('submit clicked');

    this.hospitals.emit('x');
  }

}
