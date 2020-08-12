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
    private popover: PopoverController,
  ) {}

  ngOnInit() {
    this.initialFeePopOverProfFee = this.professionalFee;
    this.initialFeePopOverRemarks = this.remarks;
    this.initialFeePopOverMethod = this.method;

    console.log("[fee] ngOnInit this.professionalFee: ->" + this.professionalFee + "<-");
    console.log("[fee] ngOnInit this.remarks: ->" + this.remarks + "<-");
    console.log("[fee] ngOnInit this.method: ->" + this.method + "<-");
  }

  ClosePopover() {
    console.log('----------ClosePopover-------');

    // Get initial value.
    this.postData.professionalFee = this.initialFeePopOverProfFee;
    this.postData.remarks = this.initialFeePopOverRemarks;
    this.postData.method = "NOTHING"; // Explicit this.postData.method = this.initialFeePopOverMethod;
    this.postData.cancel = true;

    console.log('[fee] this.postData.professionalFee: ' + this.postData.professionalFee + ' | ' + 
    '[fee] this.postData.remarks: ' + this.postData.remarks + ' | ' + 
    '[fee] this.postData.method: ' + this.postData.method + ' | ' +
    '[fee] this.postData.cancel: ' + this.postData.cancel);
    console.log('----------popOverDismiss-------');

    this.popover.dismiss(this.postData);
  }

  feeInputChanged() {
    let feePopOverProfFeeInput = (<HTMLInputElement>(
      document.getElementById("input-professionalFee")
    )).value;

    let feePopOverRemarksInput = (<HTMLInputElement>document.getElementById("input-remarks"))
      .value;
      
      console.log(feePopOverProfFeeInput);
      console.log(this.remarks);
      console.log(feePopOverRemarksInput);

      if((this.professionalFee == feePopOverProfFeeInput && this.remarks == feePopOverRemarksInput) || 
        ((feePopOverProfFeeInput == "" || feePopOverProfFeeInput == null) && this.remarks != feePopOverRemarksInput) ||
        (feePopOverProfFeeInput == "0" && this.method != "")) {
        this.disableSaveBtn = false;
      } else this.disableSaveBtn = true;
  }

  save() {
    let feePopOverMethod = "";

    let feePopOverProfFee = (<HTMLInputElement>(
      document.getElementById("input-professionalFee")
    )).value;

    let feePopOverRemarks = (<HTMLInputElement>document.getElementById("input-remarks"))
      .value;

    console.log(
      "[fee] feePopOverProfFee: " +
        feePopOverProfFee +
        " --- " +
        "feePopOverRemarks: " +
        feePopOverRemarks +
        " --- " +
        "feePopOverMethod: " +
        feePopOverMethod
    );

    if (this.method == "POST") {
      console.log('[fee] this.method: ' + this.method);
      feePopOverMethod = "POST";
    } else if ( this.professionalFee == feePopOverProfFee && this.remarks == feePopOverRemarks) {
      console.log("nothing1");
      feePopOverMethod = "NOTHING";

      console.log('[fee] feePopOverProfFee: ' + feePopOverProfFee);
      console.log('[fee] feePopOverRemarks: ' + feePopOverRemarks);
      console.log('[fee] feePopOverMethod: ' + feePopOverMethod);

    } else if (this.method == "" /*|| this.method == "POST")*/ && feePopOverProfFee != "0" && feePopOverProfFee != "") {
      feePopOverMethod = "PUT";

      console.log('[fee] feePopOverProfFee: ' + feePopOverProfFee);
      console.log('[fee] feePopOverMethod: ' + feePopOverMethod);

    } else if (this.method == "" && feePopOverProfFee == "0" || feePopOverProfFee == "") {
      feePopOverMethod = "DELETE";

      console.log('[fee] feePopOverProfFee: ' + feePopOverProfFee);
      console.log('[fee] feePopOverMethod: ' + feePopOverMethod);

    } else if (this.method == "" && feePopOverProfFee == "") {
      console.log("nothing2");
      feePopOverMethod = "NOTHING";

      console.log('[fee] feePopOverProfFee: ' + feePopOverProfFee);
      console.log('[fee] feePopOverMethod: ' + feePopOverMethod);

    } else if (this.method == 'POST' && (this.professionalFee == null || feePopOverProfFee == "")) {
      console.log("nothing3");
      feePopOverMethod = "NOTHING";

      console.log('[fee] feePopOverProfFee: ' + feePopOverProfFee);
      console.log('[fee] feePopOverMethod: ' + feePopOverMethod);
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
