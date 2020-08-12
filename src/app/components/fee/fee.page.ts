import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
@Component({
  selector: "app-fee",
  templateUrl: "./fee.page.html",
  styleUrls: ["./fee.page.scss"],
})
export class FeePage implements OnInit {
  public initialFeePopOverProfFee: string = "";
  public initialFeePopOverRemarks: string = "";
  public initialFeePopOverMethod: string = "";
  public disableSaveBtn = false;

  public postData = {
    professionalFee: "",
    remarks: "",
    method: "NOTHING",
    cancel: true,
  };
  @Input() professionalFee: any;
  @Input() remarks: any;
  @Input() method: any;

  constructor(
    private modalController: ModalController,
    private popover: PopoverController
  ) {}

  ngOnInit() {
    this.initialFeePopOverProfFee = this.professionalFee;
    this.initialFeePopOverRemarks = this.remarks;
    this.initialFeePopOverMethod = this.method;
  }

  ClosePopover() {
    // Get initial value.
    this.postData.professionalFee = this.initialFeePopOverProfFee;
    this.postData.remarks = this.initialFeePopOverRemarks;
    this.postData.method = "NOTHING"; // Explicit this.postData.method = this.initialFeePopOverMethod;
    this.postData.cancel = true;

    this.popover.dismiss(this.postData);
  }

  feeInputChanged() {
    let feePopOverProfFeeInput = (<HTMLInputElement>(
      document.getElementById("input-professionalFee")
    )).value;

    let feePopOverRemarksInput = (<HTMLInputElement>(
      document.getElementById("input-remarks")
    )).value;

    if (
      (this.professionalFee == feePopOverProfFeeInput &&
        this.remarks == feePopOverRemarksInput) ||
      ((feePopOverProfFeeInput == "" || feePopOverProfFeeInput == null) &&
        this.remarks != feePopOverRemarksInput) ||
      (feePopOverProfFeeInput == "0" && this.method != "")
    ) {
      this.disableSaveBtn = false;
    } else this.disableSaveBtn = true;
  }

  save() {
    let feePopOverMethod = "";

    let feePopOverProfFee = (<HTMLInputElement>(
      document.getElementById("input-professionalFee")
    )).value;

    let feePopOverRemarks = (<HTMLInputElement>(
      document.getElementById("input-remarks")
    )).value;

    if (this.method == "POST") {
      feePopOverMethod = "POST";
    } else if (
      this.professionalFee == feePopOverProfFee &&
      this.remarks == feePopOverRemarks
    ) {
      feePopOverMethod = "NOTHING";
    } else if (
      this.method == "" &&
      feePopOverProfFee != "0" &&
      feePopOverProfFee != ""
    ) {
      feePopOverMethod = "PUT";
    } else if (
      (this.method == "" && feePopOverProfFee == "0") ||
      feePopOverProfFee == ""
    ) {
      feePopOverMethod = "DELETE";
    } else if (this.method == "" && feePopOverProfFee == "") {
      feePopOverMethod = "NOTHING";
    } else if (
      this.method == "POST" &&
      (this.professionalFee == null || feePopOverProfFee == "")
    ) {
      feePopOverMethod = "NOTHING";
    }

    let postData = {
      professionalFee: feePopOverProfFee,
      remarks: feePopOverRemarks,
      method: feePopOverMethod,
      cancel: false,
    };

    this.popover.dismiss(postData);
  }
}
