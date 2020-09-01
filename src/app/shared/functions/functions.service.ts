import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(public alertController: AlertController) { }

  /* Alert */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /* Get System Date */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  getSystemDate() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /* Get System Date Time */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  getSystemDateTime() {
    let xx = new Date();
    let H = this.addZeroBefore(xx.getHours());
    let i = this.addZeroBefore(xx.getMinutes());
    let s = this.addZeroBefore(xx.getSeconds());
    let v = xx.getMilliseconds();
    return this.getSystemDate() + "T" + H + ":" + i + ":" + s + "." + v + "Z";
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /* Get System Date Time */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /* Explode Date */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  explodeDate(data: any) {
    let myarr = data.split("T");
    if (myarr[1]) {
      let myarr2 = myarr[1].split(".");
      return myarr[0] + " | " + myarr2[0];
    }
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  
  /* Validate Login Inputs */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /* validateLogin(postData: string) {
    let username = postData.username.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  } */
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
}
