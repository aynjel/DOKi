import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";
import { OnlineResultService } from "src/app/services/onlie-result/online-result.service";
@Component({
  selector: "app-exam-results-modal",
  templateUrl: "./exam-results-modal.component.html",
  styleUrls: ["./exam-results-modal.component.scss"],
})
export class ExamResultsModalComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  constructor(
    private modalCtrl: ModalController,
    private orService: OnlineResultService
  ) {}
  @Input() ExamDetails;
  @Input() requestType;
  pdf = {
    requestNo: "string",
    patientNo: "string",
    section: "string",
    examType: "string",
    examCode: "string",
    examNo: "string",
    testId: "string",
    site: "string",
  };
  ngOnInit() {
    console.log(this.requestType);
    this.pdf.requestNo = this.ExamDetails.request_No;
    this.pdf.patientNo = this.ExamDetails.patient_No;
    this.pdf.section = this.ExamDetails.exam;
    this.pdf.examType = this.ExamDetails.examType;
    this.pdf.examCode = this.ExamDetails.exam_Code;
    this.pdf.site = this.ExamDetails.site;
    this.pdf.testId = this.ExamDetails.exam_Description;
    /*if (this.requestType == "radiology") {
    }
    if (this.requestType == "radiology") {
      this.requestType = this.ExamDetails.exam.toLowerCase();
    }*/
    if (this.requestType == "cardio") {
      this.requestType = "cardiology";
    }
    if (this.requestType == "endoscopy") {
      this.requestType = "endoscopy";
    }
    if (this.requestType == "neurophysio") {
      this.requestType = "neurophysio";
    }
    if (this.requestType == "laboratory") {
      this.requestType = "lab";
    }
    if (this.requestType == "pulmonary") {
      this.requestType = "pulmonary";
    }
    if (this.requestType == "radiology") {
      this.requestType = "radiology";
    }
    this.getPDF(this.pdf);
    // this.pdf.examNo = this.ExamDetails.
  }
  pdfSrc;
  link;
  isPDFLoading: boolean = false;
  getPDF(data) {
    console.log("getPDF");
    this.isPDFLoading = true;
    this.orService
      .getPDF(this.pdf, this.requestType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data: any) => {
          console.log(data);

          this.isPDFLoading = false;
          let blob = new Blob([data], { type: "application/pdf" });
          let downloadURL = window.URL.createObjectURL(data);
          this.pdfSrc = downloadURL;
          this.link = "";
          this.link = document.createElement("a");
          this.link.href = downloadURL;
          this.link.download =
            this.ExamDetails.exam_Description +
            "-" +
            this.ExamDetails.date_Exam +
            ".pdf";
        },
        (error) => {
          this.isPDFLoading = false;
          console.log(error);

          /*this.isPDFLoading = false;
          console.log('error');
          console.log(error);*/
        },
        () => {
          this.isPDFLoading = false;
          // this.isPDFLoading = false;
        }
      );
  }
  back() {
    this.modalCtrl.dismiss();
  }
  ionViewDidLeave() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  downloadpdf() {
    this.link.click();
  }
}
