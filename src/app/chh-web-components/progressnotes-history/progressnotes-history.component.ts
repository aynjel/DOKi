import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {
  IonContent,
  IonList,
  IonTextarea,
  ModalController,
} from '@ionic/angular';
import { DoctorConstants } from 'src/app/config/auth-constants';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
@Component({
  selector: 'app-progressnotes-history',
  templateUrl: './progressnotes-history.component.html',
  styleUrls: ['./progressnotes-history.component.scss'],
})
export class ProgressnotesHistoryComponent implements OnInit {
  @ViewChild(IonList, { read: ElementRef }) list: ElementRef;
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('commentDetailWrapper', { static: false }) commentDetailWrapper;

  @Input() data: any;
  progessNotes: any;
  progessNotesTemp: any;
  isEmpty: boolean = false;
  comment: any = '';
  summary: any = {
    pnotes_trans_no: 0,
    msg: '',
    user_created: 'string',
  };
  modified: boolean;
  user_;
  toBot: boolean;
  constructor(
    private modalController: ModalController,
    // private residentService: ResidentService,
    private functionService: FunctionsService,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    //console.log(this.ionContent);

    this.modified = true;
    this.getProgressNotesHistory();

    this.summary.user_created = atob(localStorage.getItem('username'));
    this.user_ = atob(localStorage.getItem('username'));
  }
  getProgressNotesHistory() {
    this.progessNotes = [];
    this.doctorService.getPatientProgressNotesHistory(this.data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.length > 0) {
          this.isEmpty = false;
          this.progessNotesTemp = res;
          let counter = 0;
          this.progessNotesTemp.forEach((el) => {
            if (el.account_no == ' ') {
              el.type = 'comment';
            } else {
              el.type = 'progressnotes';
            }
            this.summary.pnotes_trans_no = el.trans_no;

            el.dateCreateConverted = this.functionService.convertDatetoMMDDYYYY(
              el.date_created
            );
            el.notessmall = this.functionService.truncateChar(el.notes, 300);
            if (el.notes.length > 200) {
              el.noteslength = true;
            } else {
              el.noteslength = false;
            }
            el.dateCreateTimeConverted = this.functionService.getTime(
              el.date_created
            );
            el.counter = counter;
            counter++;
            this.progessNotes.push(el);
          });
          ////console.log(this.progessNotes);
        } else {
          this.isEmpty = true;
        }
      },
      (error) => {},
      () => {
        this.toBot = true;
      }
    );
  }

  sendComment() {
    console.log(this.summary);
    this.doctorService.addComment(this.summary).subscribe(
      (res: any) => {},
      (error) => {},
      () => {
        this.summary.msg = '';
        this.getProgressNotesHistory();
      }
    );
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  ngAfterViewChecked() {
    if (this.toBot) {
      this.ScrollToBottom();
      this.toBot = false;
    }
  }
  ScrollToBottom() {
    setTimeout(() => {
      this.ionContent.scrollToBottom(30);
    }, 100);
  }
}
