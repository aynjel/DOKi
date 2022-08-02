import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'resi-progress-notes',
  templateUrl: './chh-app-resi-progress-notes.component.html',
  styleUrls: ['./chh-app-resi-progress-notes.component.scss'],
})
export class ChhAppResiProgressNotesComponent implements OnInit {
  @Output() redirect: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  onClick() {
    console.log('im clicked');
  }
}
