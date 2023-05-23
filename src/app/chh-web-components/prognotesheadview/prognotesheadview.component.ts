import { Component, OnInit, Input } from "@angular/core";
import { ResiService } from "src/app/services/resi/resi.service";
import { FunctionsService } from "src/app/shared/functions/functions.service";

@Component({
  selector: "app-prognotesheadview",
  templateUrl: "./prognotesheadview.component.html",
  styleUrls: ["./prognotesheadview.component.scss"],
})
export class PrognotesheadviewComponent implements OnInit {
  @Input() account_no;
  @Input() mdCode;
  @Input() doctor_Status_code;
  constructor(
    public residentService: ResiService,
    public functionsService: FunctionsService
  ) {}
  progessNotes;
  progessNotesTemp;
  patient_id;
  progressNotesIsNotReady;
  activeDays;
  dateAdmitted;
  progressNotesIsEmpty;
  totalProgressNotes;
  ngOnInit() {
    let x = JSON.parse(
      unescape(atob(localStorage.getItem("_cap_userDataKey")))
    );
    this.getProgressNote();
  }
  counter: any = 0;
  approvedCounter: any = 0;
  isLoading: boolean = false;
  getProgressNote() {
    this.isLoading = true;
    this.progessNotes = [];
    this.progessNotesTemp = [];
    this.progressNotesIsNotReady = true;
    let perAdmission = {
      account_no: "",
    };
    perAdmission.account_no = this.account_no;

    this.residentService
      .getPatientProgressNotesPerAdmission(perAdmission)
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          ////console.log(res);

          res.sort(function (a, b) {
            let dateA: any = new Date(a.event_date),
              dateB: any = new Date(b.event_date);
            return dateB - dateA;
          });

          this.progessNotesTemp = res;
        },
        (error) => {
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.totalProgressNotes = 0;
          this.progessNotesTemp.forEach((el) => {
            let counter = 0;
            let approvedCounter = 0;

            if (this.doctor_Status_code == "AP") {
              el.resi_notes.forEach((elemensssst) => {
                counter += elemensssst.number_of_notes;
                approvedCounter += elemensssst.number_of_ap_approved_notes;
                this.totalProgressNotes += elemensssst.number_of_notes;
              });
            } else {
              el.resi_notes.forEach((elemensssst) => {
                if (elemensssst.dr_code == this.mdCode) {
                  counter += elemensssst.number_of_notes;
                  approvedCounter += elemensssst.number_of_approved_notes;
                }
                this.totalProgressNotes += elemensssst.number_of_notes;
              });
            }

            this.counter += counter;
            this.approvedCounter += approvedCounter;
          });
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
}
