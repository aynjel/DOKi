import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Constants } from '../constants';
import { ModalController, PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import * as bcrypt from 'bcryptjs';
import { Inject, PLATFORM_ID, InjectionToken, Component } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  private readonly documentIsAccessible: boolean;
  constructor(
    public alertController: AlertController,
    public constants: Constants,
    public toastController: ToastController,
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>
  ) {
    this.documentIsAccessible = isPlatformBrowser(this.platformId);
  }

  /**
   * Alert
   * @param data1 Text Message
   * @param data2 Button Label
   */
  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: data1,
      backdropDismiss: false,
      buttons: [{ text: data2, handler: () => {} }],
    });
    await alert.present();
  }

  /**
   * Get System Date
   * @example
   * Return: 2020-09-14
   */
  getSystemDate() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return '' + y + '-' + mm + '-' + dd;
  }

  /**
   * Get System Date Time
   * @example
   * Return: 2020-09-14T15:08:47.640Z
   */
  getSystemDateTime() {
    let xx = new Date();
    let H = this.addZeroBefore(xx.getHours());
    let i = this.addZeroBefore(xx.getMinutes());
    let s = this.addZeroBefore(xx.getSeconds());
    let v = xx.getMilliseconds();
    return this.getSystemDate() + 'T' + H + ':' + i + ':' + s + '.' + v + 'Z';
  }

  /**
   * Add zero before the first character
   * @param n Number
   * @example
   * Parameter (n): 6
   * Return: 06
   */
  addZeroBefore(n) {
    return (n < 10 ? '0' : '') + n;
  }

  /**
   * Explode Date / Split Date & Time using | separator
   * @param data
   * @example
   * Parameter (data): 2020-03-16T23:26:06.013
   * Return: 2020-03-16 | 23:26:06
   */
  explodeDate(data: any) {
    let myarr = data.split('T');
    if (myarr[1]) {
      let myarr2 = myarr[1].split('.');
      // console.log(myarr[0] + " | " + myarr2[0]);
      return myarr[0] + ' | ' + myarr2[0];
    }
  }

  /**
   * Get Doctor Status Code
   * @param data String source data
   * @example
   * Parameter (data): Co-Manage
   * Return: CM
   * Table:
   * CM = Co-Manage
   * AP = Primary Attending Physician
   * CO = Consult
   * HC = HMO
   */
  getDoctorStatusCode(data: string) {
    if (data == this.constants.DOCTOR_SERVICE_TYPE__VALUE__CO_MANAGE)
      return this.constants.DOCTOR_SERVICE_TYPE__CODE__CO_MANAGE;
    if (
      data ==
      this.constants.DOCTOR_SERVICE_TYPE__VALUE__PRIMARY_ATTENDING_PHYSICIAN
    )
      return this.constants
        .DOCTOR_SERVICE_TYPE__CODE__PRIMARY_ATTENDING_PHYSICIAN;
    if (data == this.constants.DOCTOR_SERVICE_TYPE__VALUE__CONSULT)
      return this.constants.DOCTOR_SERVICE_TYPE__CODE__CONSULT;
    if (data == this.constants.DOCTOR_SERVICE_TYPE__VALUE__HMO)
      return this.constants.DOCTOR_SERVICE_TYPE__CODE__HMO;
  }

  /**
   * Close Pop Over Controller
   * @param popOverController
   */
  public closePopOver(popOverController: PopoverController) {
    popOverController.dismiss();
  }

  /**
   * Close Modal Controller
   * @param modalController
   */
  public async closeModal(modalController: ModalController) {
    await modalController.dismiss();
  }

  /**
   * Increment Date
   * @param date_str String date
   * @param incrementor Integer value
   * @example
   * Parameter (date_str): 2020-09-14
   * Parameter (incrementor): 1
   * Return: 2020-09-15
   */
  incrementDate(date_str, incrementor) {
    var parts = date_str.split('-');
    var dt = new Date(
      parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setTime(dt.getTime() + incrementor * 86400000);
    parts[0] = '' + dt.getFullYear();
    parts[1] = '' + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = '0' + parts[1];
    }
    parts[2] = '' + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = '0' + parts[2];
    }
    return parts.join('-');
  }

  /**
   * Convert to camel case
   * @param str String to be converted
   * @example
   * Parameter (str): test data
   * Return: Test Data
   */
  convertToCamelCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  /**
   * Truncate character(s) from string data
   * @param text Source string data
   * @param limit Total numbers of characters to truncate
   * @example
   * Parameter (text): test data
   * Parameter (limit): 6
   * Return: test d
   */
  truncateChar(text: string, limit: any): string {
    let charlimit = limit;
    if (!text || text.length <= charlimit) {
      return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + '...';
    return shortened;
  }

  /**
   * Convert all first letter to upper case
   * @param stringData String data to be converted
   * @returns Converted string
   * @example
   * Parameter (stringData): test data
   * Return: Test Data
   */
  convertAllFirstLetterToUpperCase(stringData: string): string {
    return stringData
      .split(' ')
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ');
  }

  /**
   * Shared function to enable/disable console logging
   * @param message Any data to display
   * @example
   * Parameter (message): Test sample
   * Output: Test sample
   */
  logToConsole(message: any) {
    if (environment.consoleLog) {
      console.log(message);
    }
  }

  sorryDoc() {
    this.alert(
      'Sorry, Dok. We cannot log you in at the moment. Please try again.',
      'Okay'
    );
  }

  isLocalorLive(data: any) {
    if (localStorage.getItem('testdb') == '1') {
      return data + 'Test';
    } else {
      return data;
    }
  }
  // numberWithCommas(x) {
  //   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  // }

  isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  check(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }

    name = encodeURIComponent(name);

    const regExp: RegExp = this.getCookieRegExp(name);
    const exists: boolean = regExp.test(this.document.cookie);

    return exists;
  }
  getcookie(name: string): string {
    if (this.documentIsAccessible && this.check(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = this.getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(this.document.cookie);

      return decodeURIComponent(result[1]);
    } else {
      return '';
    }
  }
  private getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(
      /([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi,
      '\\$1'
    );

    return new RegExp(
      '(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)',
      'g'
    );
  }

  getAdmissionStatus(data: any) {
    let x = '';
    if (data == 'RE') {
      x = 'Registered';
    } else if (data == 'AC') {
      x = 'Admitted';
    } else if (data == 'DN') {
      x = 'For Discharge';
    } else if (data == 'BP') {
      x = 'Partially Settled';
    } else if (data == 'PP') {
      x = 'Ok For Checkout';
    } else if (data == 'CO') {
      x = 'Checkout';
    } else if (data == 'BA') {
      x = 'Billing Approved';
    } else if (data == 'CC') {
      x = 'Checked-out With Balance';
    } else if (data == 'FP') {
      x = 'Ok For Checkout';
    } else if (data == 'CA') {
      x = 'Cancelled';
    } else if (data == 'PA') {
      x = 'Pre-Admitted';
    } else if (data == 'OP') {
      x = 'Re-Opened (w/o b)';
    } else if (data == 'ON') {
      x = 'Re-Opened (wb)';
    } else if (data == 'UA') {
      x = 'Unit Admission';
    } else if (data == 'BB') {
      x = 'Fully Settled';
    }

    return x;
  }
  getDateTodayMMDDYYYY() {
    let dateCreate = new Date();
    let dd = String(dateCreate.getDate()).padStart(2, '0');
    let mm = String(dateCreate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = dateCreate.getFullYear();
    let xtoday = mm + '/' + dd + '/' + yyyy;
    return xtoday;
  }
  convertDatetoMMDDYYYY(date) {
    let dateCreate = new Date(date);
    let dd = String(dateCreate.getDate()).padStart(2, '0');
    let mm = String(dateCreate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = dateCreate.getFullYear();
    let xtoday = mm + '/' + dd + '/' + yyyy;
    return xtoday;
  }
  getTime(date) {
    var d = new Date(date); // for now
    let Hour = d.getHours(); // => 9
    let Min = d.getMinutes(); // =>  30
    let Sec = d.getSeconds(); // => 51
    let xtime = Hour + ':' + Min + ':' + Sec;
    return xtime;
  }
  imageExists(image_url) {
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
  }
  getDateYYYYMMDD(date: any = '') {
    let dateReturn;
    if (date == '') {
      let date1 = new Date();
      let day1 = date1.getDate();
      let month1 = date1.getMonth() + 1;
      let year1 = date1.getFullYear();
      dateReturn =
        year1 + '-' + ('0' + month1).slice(-2) + '-' + ('0' + day1).slice(-2);
    } else {
      let today = new Date();
      let days = 86400000; //number of milliseconds in a day
      let fiveDaysAgo = new Date(today.getTime() - date * days);
      let day11 = fiveDaysAgo.getDate();
      let month11 = fiveDaysAgo.getMonth() + 1;
      let year11 = fiveDaysAgo.getFullYear();
      dateReturn =
        year11 +
        '-' +
        ('0' + month11).slice(-2) +
        '-' +
        ('0' + day11).slice(-2);
    }
    return dateReturn;
  }
  getDateYYYYMMDD_90() {
    let today = new Date();
    let days = 86400000; //number of milliseconds in a day
    let fiveDaysAgo = new Date(today.getTime() - 15 * days);
    let day11 = fiveDaysAgo.getDate();
    let month11 = fiveDaysAgo.getMonth() + 1;
    let year11 = fiveDaysAgo.getFullYear();
    let sendDatedateValue11 =
      year11 + '-' + ('0' + month11).slice(-2) + '-' + ('0' + day11).slice(-2);
    return sendDatedateValue11;
  }
  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 2000,
    });
    toast.present();
  }
}
