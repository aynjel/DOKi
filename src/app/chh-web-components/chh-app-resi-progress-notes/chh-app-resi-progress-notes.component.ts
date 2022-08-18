import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'resi-progress-notes',
  templateUrl: './chh-app-resi-progress-notes.component.html',
  styleUrls: ['./chh-app-resi-progress-notes.component.scss'],
})
export class ChhAppResiProgressNotesComponent implements OnInit {
  @Output() redirect: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  patient_id;
  ngOnInit() {}
  onClick() {
    this.patient_id = this.activatedRoute.snapshot.params.id;
    this.router.navigate([
      '/menu/in-patients/' + this.patient_id + '/progressnotes/',
    ]);
  }
}
