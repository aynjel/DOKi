import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Constants } from "../constants";
import { ModalController, PopoverController } from "@ionic/angular";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})

export class FunctionsService {
  constructor(
    public alertController: AlertController,
    public constants: Constants
  ) {}

 /**
  * Alert
  * @param data1 Text Message
  * @param data2 Button Label
  */
  async alert(data1: any, data2: any) {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      message: data1,
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
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
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
    return this.getSystemDate() + "T" + H + ":" + i + ":" + s + "." + v + "Z";
  }

  /**
   * Add zero before the first character
   * @param n Number
   * @example
   * Parameter (n): 6
   * Return: 06
   */
  addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }

  /**
   * Explode Date / Split Date & Time using | separator
   * @param data 
   * @example
   * Parameter (data): 2020-03-16T23:26:06.013
   * Return: 2020-03-16 | 23:26:06
   */
  explodeDate(data: any) {
    let myarr = data.split("T");
    if (myarr[1]) {
      let myarr2 = myarr[1].split(".");
      console.log(myarr[0] + " | " + myarr2[0]);
      return myarr[0] + " | " + myarr2[0];
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
  public closePopOver(popOverController: PopoverController)
  {
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
    var parts = date_str.split("-");
    var dt = new Date(
      parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setTime(dt.getTime() + incrementor * 86400000);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  }

 /**
  * Convert to camel case
  * @param str String to be converted
  * @example
  * Parameter (str): test data
  * Return: Test Data
  */
  convertToCamelCase(str:string){
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
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
  truncateChar(text: string, limit:any): string {
    let charlimit = limit;
    if(!text || text.length <= charlimit )
    {
        return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
    let shortened = without_html.substring(0, charlimit) + "...";
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
  convertAllFirstLetterToUpperCase(stringData: string):string{
    return stringData.split(" ").map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(" ")
  }
  
  /**
   * Shared function to enable/disable console logging
   * @param message Any data to display
   * @example
   * Parameter (message): Test sample
   * Output: Test sample
   */
  logToConsole(message: any){
    if(environment.consoleLog){
      console.log(message);
    }
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

}
