import { Injectable } from "@angular/core";
import { MenuController, ModalController } from "@ionic/angular";
import { AuthConstants, Consta } from "../../config/auth-constants";
import { StorageService } from "../storage/storage.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { RevokeTokenV3 } from "src/app/models/doctor";
import { FunctionsService } from "src/app/shared/functions/functions.service";
import { DoctorService } from "../doctor/doctor.service";
@Injectable({
  providedIn: "root",
})
export class LogoutService {
  userData$ = new BehaviorSubject<any>([]);
  constructor(
    public modalController: ModalController,
    private storageService: StorageService,
    public router: Router,
    private menu: MenuController,
    public functionsService: FunctionsService,
    private doctorService: DoctorService
  ) {}

  closemodal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
  async checkSideMenu() {
    let x = await this.menu.isOpen();
    console.log(x);
    if (x) {
      await this.menu.close();
    }
  }
  async clearCache() {
    const keys = await window.caches.keys();
    await Promise.all(
      keys.map((key) => {
        console.log(key);
        caches.delete(key);
        console.log(key);
      })
    );
  }
  public revokeTokenV3: RevokeTokenV3;
  out() {
    this.clearCache();
    this.checkSideMenu();
    this.modalController.getTop().then((res) => {
      if (res) {
        this.closemodal();
      }
    });
    let dr_username = atob(localStorage.getItem("username"));
    this.userData$.next("");
    this.revokeTokenV3 = new RevokeTokenV3();

    this.revokeTokenV3.jwt = decodeURIComponent(
      this.functionsService.getcookie("refreshToken")
    );

    this.doctorService
      .revokeTokenV3(this.revokeTokenV3)
      .subscribe((res: any) => {
        this.functionsService.logToConsole(res);
      });

    localStorage.removeItem("tokenExpired");
    localStorage.removeItem("role_flag");
    localStorage.removeItem("id_token");
    localStorage.removeItem("_cap_userDataKey");
    localStorage.removeItem("user_settings");
    localStorage.removeItem("isIdle");
    localStorage.removeItem("modaled");
    //localStorage.removeItem('promptLogout');
    localStorage.removeItem("isIdlestarted");
    localStorage.removeItem("patientData");
    localStorage.removeItem("postData1");
    localStorage.removeItem("daysManaged");
    localStorage.removeItem("pnSelected");
    localStorage.removeItem("fromurl");

    localStorage.removeItem("Api_from");
    localStorage.removeItem("Api_to");
    localStorage.removeItem("doctor_Status_code");
    localStorage.removeItem("changeMode");
    localStorage.removeItem("admission_status");
    localStorage.removeItem("dayselected");
    localStorage.removeItem("siteSelected");
    localStorage.removeItem("summary_status");
    localStorage.removeItem("isModal");
    //localStorage.removeItem('selectedPatient');

    localStorage.setItem("srnm", dr_username);
    localStorage.setItem("hasloggedin", "1");
    this.router.navigate(["/login"]).then(() => {
      //window.location.reload();
    });
  }
}
