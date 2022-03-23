import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import {
  IonContent,
  IonList,
  IonTextarea,
  ModalController,
} from '@ionic/angular';
import { DoctorConstants } from 'src/app/config/auth-constants';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-progressnotes-history',
  templateUrl: './progressnotes-history.component.html',
  styleUrls: ['./progressnotes-history.component.scss'],
})
export class ProgressnotesHistoryComponent implements OnInit {
  @ViewChild(IonList, { read: ElementRef }) list: ElementRef;
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('commentDetailWrapper', { static: false }) commentDetailWrapper;
  private _hubConnection: HubConnection;
  @Input() data: any;
  progessNotes: any;
  progessNotes1: any;
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
    private doctorService: DoctorService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //console.log(this.ionContent);
    this.connect();
    this.modified = true;
    this.getProgressNotesHistory();

    this.summary.user_created = atob(localStorage.getItem('username'));
    this.user_ = atob(localStorage.getItem('username'));
  }
  getProgressNotesHistory() {
    this.progessNotes = [];
    this.progessNotes1 = [];
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
            this.progessNotes1.push(el);
          });
          ////console.log(this.progessNotes);
        } else {
          this.isEmpty = true;
        }
      },
      (error) => {},
      () => {
        this.toBot = true;
        this.processJson(10);
      }
    );
  }
  upto = 0;
  processJson(x) {
    console.log(this.progessNotes.length);
    this.upto += x;
    let i = 0;
    this.progessNotes = [];
    this.progessNotes1.forEach((el) => {
      if (
        i >= this.progessNotes1.length - this.upto &&
        i <= this.progessNotes1.length
      ) {
        this.progessNotes.push(el);
      }
      i++;
    });
  }
  sendComment() {
    console.log(this.summary);
    this.doctorService.addComment(this.summary).subscribe(
      (res: any) => {},
      (error) => {},
      () => {
        this.summary.msg = '';
        //this.getProgressNotesHistory();
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

  public onSendButtonClick(): void {
    this._hubConnection.send('SendMessage', 'test message').then((r) => {});
  }

  private connect(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://10.151.12.120/chat')
      .build();

    this._hubConnection.on('broadcasttoresigroup', (message: any) => {
      let txtMessage = '[' + JSON.stringify(message) + ']';
      let jsonMessage = JSON.parse(txtMessage);
      let counter = jsonMessage.length;
      jsonMessage.forEach((el) => {
        if (el.account_no == '') {
          el.type = 'comment';
        } else {
          el.type = 'progressnotes';
        }
        el.dateCreateConverted = this.functionService.convertDatetoMMDDYYYY(
          el.date_created
        );
        el.notessmall = this.functionService.truncateChar(el.msg, 300);
        if (el.msg.length > 200) {
          el.noteslength = true;
        } else {
          el.noteslength = false;
        }
        el.dateCreateTimeConverted = this.functionService.getTime(
          el.date_created
        );
        el.counter = counter;
        counter++;
        this.ngZone.run(() => {
          this.toBot = true;
          this.progessNotes.push(el);
        });
      });
    });

    this._hubConnection
      .start()
      .then(() => {
        console.log('connection started');
        this._hubConnection
          .invoke('addtoresigroup', this.data)
          .then((res) => {
            //console.log(res);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) =>
        console.log('error while establishing signalr connection: ' + err)
      );
  }
  ngOnDestroy() {
    console.log('ngOnDestroy');

    this._hubConnection.stop();
  }
  loadData(event) {
    setTimeout(() => {
      this.processJson(10);
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  }
}
