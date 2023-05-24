import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ActionSheetController } from "@ionic/angular";
import { ResiService } from "src/app/services/resi/resi.service";
import { ScreenSizeService } from "src/app/services/screen-size/screen-size.service";
@Component({
  selector: "app-chh-app-list-of-doctors",
  templateUrl: "./chh-app-list-of-doctors.component.html",
  styleUrls: ["./chh-app-list-of-doctors.component.scss"],
})
export class ChhAppListOfDoctorsComponent implements OnInit {
  @Input() coDoctors: any;
  @Input() drCode: any;
  @Input() objecthandler: any;
  @Input() isFetchDone: any;
  @Input() fromExec: any = false;
  @Input() isAP: any = false;
  @Input() isTC: any = false;
  @Input() iHaveTC: any = false;
  @Input() isVerify: any = false;
  @Input() isAPVerifyTCstatus: any = false;
  @Output() triggerRefresh = new EventEmitter<any>();
  isDesktop: any;
  constructor(
    private screensizeService: ScreenSizeService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private resiService: ResiService
  ) {
    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      if (this.isDesktop && !isDesktop) {
        window.location.reload();
      }
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {}
  onClick(dr) {
    ////console.log(':'+this.drCode+':'+dr.dr_code+':');

    if (this.drCode != dr.dr_code) {
      // //console.log(dr.dr_code);
      // this.router.navigate(['executive/doctors/'+dr.dr_code]);
      // //console.log( localStorage.getItem('listOfDoctors'));
    }

    //
  }
  result;
  transfer = {
    admission_no: "IPM000230217",
    dr_code: "MD100003",
    transfer_flg: "N",
  };
  async presentActionSheet(data) {
    //console.log(data);
    this.transfer.admission_no = data.admission_no;
    this.transfer.dr_code = data.dr_code;
    this.transfer.transfer_flg = "Y";
    //console.log(this.transfer);

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Transfer Approval",
      subHeader:
        "transfer approval to Dr." +
        data.last_name +
        ", " +
        data.first_name +
        "?",
      buttons: [
        {
          text: "Yes",
          data: {
            action: "yes",
          },
        },
        {
          text: "Cancel",
          role: "destructive",
          data: {
            action: "cancel",
          },
        },
      ],
    });

    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.data.action == "yes") {
      this.resiService
        .post("/gw/doki/inpatients/transfertocover", this.transfer)
        .subscribe({
          complete: () => {
            // window.location.reload();
            //console.log("trigger emit");
            this.triggerRefresh.emit("TEST DATA");
          },
          error: (error) => {
            //console.log(error);
          },
          next: (data: any) => {
            //////console.log(data);
          },
        });
    }
  }
  async unassign(data) {
    //console.log(data);
    this.transfer.admission_no = data.admission_no;
    this.transfer.dr_code = data.dr_code;
    this.transfer.transfer_flg = "N";

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Unassign Approval",

      buttons: [
        {
          text: "Yes",
          data: {
            action: "yes",
          },
        },
        {
          text: "Cancel",
          role: "destructive",
          data: {
            action: "cancel",
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);

    if (result.data.action == "yes") {
      this.resiService
        .post("/gw/doki/inpatients/transfertocover", this.transfer)
        .subscribe({
          complete: () => {
            // window.location.reload();
            //console.log("trigger emit");

            this.triggerRefresh.emit("TEST DATA");
          },
          error: (error) => {
            //console.log(error);
          },
          next: (data: any) => {
            //////console.log(data);
          },
        });
    }
  }
}
