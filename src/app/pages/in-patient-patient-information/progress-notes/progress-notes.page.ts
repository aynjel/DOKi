import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Component({
  selector: 'app-progress-notes',
  templateUrl: './progress-notes.page.html',
  styleUrls: ['./progress-notes.page.scss'],
})
export class ProgressNotesPage implements OnInit {
  isDesktop: boolean;
  patient_id: any;
  patientId: any;
  patientInfo: any;
  progessNotes: any = [];
  progessNotesTemp: any = [];
  progressNotesIsEmpty: boolean = false;
  progressNotesIsNotReady: boolean = false;
  activeDays: any = [];
  constructor(
    private screensizeService: ScreenSizeService,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private functionService: FunctionsService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
    this.patient_id = this.activatedRoute.snapshot.params.id;
    this.getProgressNote();
  }

  getProgressNote() {
    this.progessNotes = [];
    this.progessNotesTemp = [];
    this.progressNotesIsNotReady = true;
    this.doctorService.getProgressNotes('test').subscribe(
      (res: any) => {
        this.progessNotesTemp = res;
      },
      (error) => {},
      () => {
        this.activeDays = [];
        this.progessNotesTemp.forEach((el) => {
          this.activeDays.push(el.notes_id);
          el.dateCreateConverted = this.functionService.convertDatetoMMDDYYYY(
            el.date_created
          );

          el.dateCreateTimeConverted = this.functionService.getTime(
            el.date_created
          );

          el.dateUpdateConverted = this.functionService.convertDatetoMMDDYYYY(
            el.date_updated
          );
          el.dateUpdateTimeConverted = this.functionService.getTime(
            el.date_updated
          );
          if (el.date_updated == '0001-01-01T00:00:00') {
            el.dateUpdateConverted = '';
          }
          el.notessmall = this.functionService.truncateChar(el.notes, 300);
          if (el.notes.length > 200) {
            el.noteslength = true;
          } else {
            el.noteslength = false;
          }
          this.progessNotes.push(el);
        });
        //console.log(this.activeDays);

        if (this.progessNotes.length <= 0) {
          this.progressNotesIsEmpty = true;
        } else {
          this.progressNotesIsEmpty = false;
        }
        this.progressNotesIsNotReady = false;
        //this.scrolltotop();
      }
    );
  }
  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }
}
