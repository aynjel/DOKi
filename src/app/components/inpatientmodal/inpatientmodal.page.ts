import { Component, OnInit, Input} from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import {FeePage } from '../fee/fee.page';
import { from } from 'rxjs';
import { PopoverController } from '@ionic/angular';  
import { timeStamp } from 'console';
import { DoctorService } from 'src/app/services/doctor.service';
@Component({
  selector: 'app-inpatientmodal',
  templateUrl: './inpatientmodal.page.html',
  styleUrls: ['./inpatientmodal.page.scss'],
})
export class InpatientmodalPage implements OnInit {
  @Input() data: any;
  site:any;
  date:any;
  professionalFee:any;
  remarks:any;
  method:any;
  coDoctors:any;
  constructor(private modalController: ModalController,
    private popover:PopoverController, private doctorService:DoctorService,public alertController: AlertController) { 

    }
    postData = {
      "AdmisisonNo": "string",
      "DoctorCode": "string",
      "DoctorStatusCode": "string",
      "ProfFee": 0,
      "DateCreated": "2020-07-01T05:14:48.712Z",
      "site": "string",
      "CreatedBy": "string",
      "Remarks": "string"
    };
    coDoctorData = {
      "first_name": "string",
      "last_name": "string",
      "status": "string",
      "mobile_no": "string",
      "dept_short_desc": "string",

    }
    async Alert(data1:any,data2:any) {const alert = await this.alertController.create({cssClass: 'my-custom-class',message: data1,buttons: [{text: data2,handler: () => {}}]});await alert.present();}
  ngOnInit() {
    this.data.admission_date = this.explodeDate(this.data.admission_date);
    if(this.data.site == 'C'){this.site = 'CHHC';}
    else{this.site = 'CHHM';}
    
    this.professionalFee = this.data.doctor_prof_fee;
    this.remarks = this.data.remarks;
       
    if(this.data.doctor_prof_fee==null){this.method = "POST";}else{this.method ="";}
    this.postData.AdmisisonNo = this.data.admission_no;
    this.postData.DoctorCode = this.data.dr_code;
    this.postData.DoctorStatusCode = this.getDoctorStatusCode(this.data.Doctor_Status);
    this.postData.site = this.data.site; 
    this.postData.CreatedBy = this.data.dr_code; 
    let coDoctors1=[];
    let coDoctors2=[];
    let coDoctors3=[];
    //"status": "Primary Attending Physician"
    this.doctorService.getCoDoctors(this.data.admission_no).subscribe(
      (res:any)=>{
        console.log(res);
        res.forEach(element => {
          
          if(element.status == 'Primary Attending Physician'){
            coDoctors1.push(element);
          }else if(element.status == 'Co-Manage'){
            coDoctors2.push(element);
          }else{
            coDoctors3.push(element);
          }
        });

        this.coDoctors = coDoctors1.concat(coDoctors2).concat(coDoctors3);

        //this.coDoctors.push(coDoctors2);
   
  
    }
    );
 
  }

  dateChanged(data1:any){
  //  console.log("changed data: "+data1);

  }
  //popup for fee
  async detail(data:any) {

    console.log("Detail : "+this.method);
      const popover = await this.popover.create({
        component: FeePage,
        showBackdrop:true,
        translucent: true,
        componentProps: { 
          professionalFee: this.professionalFee,
          remarks:this.remarks,
          method:this.method,
         },
      });
      popover.present();
      return popover.onDidDismiss().then(
        (data: any) => {
          if (data) {
            console.log(data.data.professionalFee);
            this.professionalFee = data.data.professionalFee;
            this.remarks = data.data.remarks;

            this.postData.ProfFee = data.data.professionalFee;
            this.postData.Remarks = data.data.remarks;
            this.postData.DateCreated = this.getDateTime();


            let x = data.data.method;
            //console.log("METHOD :" + x);
           // this.doctorService.insertPF(this.postData);
            if(x == 'POST'){
              this.doctorService.insertPF(this.postData).subscribe(
                (res: any) => {
                  this.Alert("Successfully SAVED the Professional Fee.","Okay");
                });
            }else if(x == 'PUT'){
              this.doctorService.updatePF(this.postData).subscribe(
                (res: any) => {
                  this.Alert("Successfully UPDATED the Professional Fee.","Okay");
                });
            }else if(x == 'DELETE'){
              this.doctorService.DeletePf(this.postData.AdmisisonNo,this.postData.DoctorStatusCode).subscribe(
                (res: any) => {
                  this.Alert("Successfully DELETED the Professional Fee.","Okay");
                  });
            }



            //this.data.doctor_prof_fee = data.professionalFee;
            //console.log("+++++"+JSON.stringify(data));
            // trigger here the method dependind on the popover response
          }
        }
    );
  }


  async closeModal() {
    await this.modalController.dismiss();
  }
  getDateTime(){
    let xx = new Date();
    let H = this.addZeroBefore(xx.getHours());
    let i = this.addZeroBefore(xx.getMinutes());
    let s = this.addZeroBefore(xx.getSeconds());
    let v = xx.getMilliseconds();

    return this.yyyymmdd()+'T'+H+':'+i+':'+s+'.'+v+'Z';
  }
  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return '' + y+"-" + mm+"-"  + dd;
  }
  getDoctorStatusCode(data:string){
    if(data == "Co-Manage") return 'CM';
    if(data == "Primary Attending Physician") return 'AP';
    if(data == "Consult") return 'CO';
    if(data == "HMO") return 'HC';
  }
  addZeroBefore(n) {
    return (n < 10 ? '0' : '') + n;
  }
  explodeDate(data:any){
    let myarr = data.split("T");
    let myarr2 = myarr[1].split(".");
    return myarr[0]+" | "+myarr2[0];
  }

}
