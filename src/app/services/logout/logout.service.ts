import { Injectable } from "@angular/core";
import { MenuController, ModalController } from "@ionic/angular";
import { AuthConstants, Consta } from "../../config/auth-constants";
import { StorageService } from "../storage/storage.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class LogoutService {
  userData$ = new BehaviorSubject<any>([]);
  constructor(
    public modalController: ModalController,
    private storageService: StorageService,
    public router: Router,
    private menu: MenuController
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
  out() {
    this.checkSideMenu();
    this.modalController.getTop().then((res) => {
      if (res) {
        this.closemodal();
      }
    });
    let dr_username = atob(localStorage.getItem("username"));
    this.userData$.next("");

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
    //localStorage.removeItem('selectedPatient');

    localStorage.setItem("srnm", dr_username);
    localStorage.setItem("hasloggedin", "1");
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}
