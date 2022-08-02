import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/doctor/doctor.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { FunctionsService } from 'src/app/shared/functions/functions.service';
import { ProgressnotesHistoryComponent } from 'src/app/chh-web-components/progressnotes-history/progressnotes-history.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ResiService } from 'src/app/services/resi/resi.service';
@Component({
  selector: 'app-progress-notes',
  templateUrl: './progress-notes.page.html',
  styleUrls: ['./progress-notes.page.scss'],
})
export class ProgressNotesPage implements OnInit {
  private ngUnsubscribe = new Subject();
  isDesktop: boolean;
  patient_id: any;
  patientId: any;
  patientInfo: any;
  progessNotes: any = [];
  progessNotesTemp: any = [];
  progressNotesIsEmpty: boolean = false;
  progressNotesIsNotReady: boolean = false;
  activeDays: any = [];
  accountNo: any;
  patientInfor;
  dateAdmitted;
  data = [];
  constructor(
    private screensizeService: ScreenSizeService,
    private activatedRoute: ActivatedRoute,
    private doctorService: DoctorService,
    private functionService: FunctionsService,
    public modalController: ModalController,
    private functionsService: FunctionsService,
    private renderer: Renderer2,
    private router: Router,
    private residentService: ResiService
  ) {
    this.screensizeService
      .isDesktopView()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isDesktop) => {
        if (this.isDesktop && !isDesktop) {
          window.location.reload();
        }
        this.isDesktop = isDesktop;
      });
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.ngUnsubscribe = new Subject();
    this.patient_id = this.activatedRoute.snapshot.params.id;
    this.getProgressNote();
    this.data = JSON.parse(atob(localStorage.getItem('selectedPatient')));
    console.log(this.data);

    this.dateAdmitted = this.data[0].admission_date;
    this.checkAppearance();
  }
  checkAppearance() {
    this.functionsService.logToConsole('checkAppearance');
    var values = JSON.parse(
      '[' + atob(localStorage.getItem('user_settings')) + ']'
    );
    let dr_username = atob(localStorage.getItem('username'));
    values.forEach((element) => {
      this.functionsService.logToConsole(element.darkmode);
      if (element.darkmode == 1) {
        this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      } else {
        this.renderer.setAttribute(document.body, 'color-theme', 'light');
      }
    });
  }
  getProgressNote() {
    this.progessNotes = [];
    this.progessNotesTemp = [];
    this.progressNotesIsNotReady = true;
    let perAdmission = {
      account_no: '',
    };
    perAdmission.account_no = this.patient_id;
    this.residentService
      .getPatientProgressNotesPerAdmission(perAdmission)
      .subscribe(
        (res: any) => {
          this.progessNotesTemp = res;
        },
        (error) => {},
        () => {
          ////console.log(this.progessNotesTemp);

          this.activeDays = [];
          this.progessNotesTemp.forEach((el) => {
            let x = 0;
            let xdateadmitted = this.dateAdmitted.substring(0, 11);

            x = this.functionsService.countDays(xdateadmitted, el.event_date);

            this.activeDays.push(el.notes_id);
            el.dateCreateConverted =
              this.functionsService.convertDatetoMMDDYYYY(el.event_date);

            if (
              this.functionsService.convertDatetoMMDDYYYY(this.dateAdmitted) ==
              el.dateCreateConverted
            ) {
              x = 0;
            }

            el.day = x;
            el.dateCreateTimeConverted = this.functionsService.getTime(
              el.event_date
            );

            el.dateUpdateConverted =
              this.functionsService.convertDatetoMMDDYYYY(el.date_updated);
            el.dateUpdateTimeConverted = this.functionsService.getTime(
              el.date_updated
            );
            if (el.date_updated == '0001-01-01T00:00:00') {
              el.dateUpdateConverted = '';
            }
            el.notessmall = this.functionsService.truncateChar(el.notes, 300);
            /*if (el.notes.length > 200) {
              el.noteslength = true;
            } else {
              el.noteslength = false;
            }*/
            this.progessNotes.push(el);
          });
          ////console.log(this.progessNotes);

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
  async options(data) {
    const options = {
      component: ProgressnotesHistoryComponent,
      cssClass: 'ion5modalviewedithistory',
      swipeToClose: true,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 1,
      backdropDismiss: false,
      componentProps: { data: data },
    };
    const modal = await this.modalController.create(options);
    await modal.present();
    // const {data} = await modal.onWillDismiss();
  }
  async viewhistory(data, day) {
    /*
    const modal = await this.modalController.create({
      component: ProgressnotesHistoryComponent,
      backdropDismiss: false,
      componentProps: { data: data, day: day },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    return await modal.present();*/
    const options = {
      component: ProgressnotesHistoryComponent,
      cssClass: 'ion5modalviewedithistory',
      swipeToClose: true,
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 1,
      backdropDismiss: false,
      componentProps: { data: data, day: day },
    };
    const modal = await this.modalController.create(options);
    await modal.present();
    // const {data} = await modal.onWillDismiss();
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  gotoPerday(date, dayselected) {
    localStorage.setItem('dayselected', dayselected);
    console.log(dayselected);
    let day = this.functionService.convertDatedash(date);
    this.router.navigate([
      '/menu/patient/' + this.patientId + '/progressnotes/' + day,
    ]);
  }
}
