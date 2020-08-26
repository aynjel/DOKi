import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthConstants } from "../../config/auth-constants";
import { DoctorConstants } from "../../config/auth-constants";
import { AuthService } from "../../services/auth/auth.service";
import { DoctorService } from "../../services/doctor/doctor.service";
import { StorageService } from "../../services/storage/storage.service";
import { ToastService } from "../../services/toast/toast.service";
import { BehaviorSubject } from "rxjs";
import { DoctorInfoGlobal } from "../../shared/doctorinfo-global";
import { LoginData } from "../../models/login-data.model";
import { AlertController } from "@ionic/angular";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})

export class LoginPage implements OnInit {
  public logindata: LoginData;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toast: ToastService,
    private doctorService: DoctorService,
    public alertController: AlertController,
    protected $gaService: GoogleAnalyticsService
  ) {}

  public postData = {
    username: "",
    password: "",
  };
  btnDisable: boolean = false;

  ngOnInit() {
    this.$gaService.pageView("/login", "Login Page");
  }

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  async Alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  }

  loginAction() {
    this.btnDisable = true;
    this.authService
      .doctorsPortalLogin(this.postData.username, this.postData.password)
      .subscribe(
        (res: any) => {
          console.log("res :");
          console.log(res);
          if (res.length != "0") {
            if (res.Message) {
              this.Alert(res.Message, "Okay");
            } else {
              this.logindata = <LoginData>res;
              this.storageService.store(AuthConstants.AUTH, this.logindata);
              this.router.navigate(["/menu/dashboard"]);
            }
          } else {
            this.Alert(
              "Oops! You might have entered a different username or password. Please try again.",
              "Okay"
            );
            //this.toast.presentToast('Incorrect Authentication Details.');
          }
        },
        (error) => {
          this.btnDisable = false;
          this.Alert(
            "Sorry, Doc. We cannot log you in at the moment. Please try again.",
            "Okay"
          );
          // this.toast.presentToast('Server Error');
        },
        () => {
          this.btnDisable = false;
        }
      );
    /*
        if (this.validateInputs()) {
          this.authService.logintest(this.postData.username, this.postData.password).subscribe(
            (res: any) => {
              if (res == "true:D") {
                this.doctorService.retrieveUserDetails(this.postData.username).subscribe(
                  (result:any)=>{
                    console.log("result.last_name --> "+result.last_name);
                    localStorage.setItem('dr_code',result.last_name);
                    this.doctorService.getDoctorName(result.last_name).subscribe(
                      (doctordetail:any)=>{
                        console.log("doctordetail --> "+JSON.stringify(doctordetail));
                          this.storageService.store(AuthConstants.AUTH, doctordetail);
                          this.router.navigate(['/menu/tab1']);
                      }
                    );
                  }
                );
              } else {
                this.toast.presentToast('incorrect password.');
              }
            },(error: any) => {
            }
          );
        } else {
        }
      */
    /**Working COPY DO NOT DELETE */
    /*For Doctors Portal

        /*For Doctors Portal */
  }
}
