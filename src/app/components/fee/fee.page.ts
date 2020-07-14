import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-fee',
  templateUrl: './fee.page.html',
  styleUrls: ['./fee.page.scss'],
})
export class FeePage implements OnInit {
  public postData = {
    professionalFee: '',
    remarks: '',
    method:'NOTHING'
  };
  @Input() professionalFee: any;
  @Input() remarks: any;
  @Input() method: any;
  constructor(private modalController: ModalController,
    private popover:PopoverController
    ) { }

  ngOnInit() {
    console.log("->"+this.method+"<-");
  }
  ClosePopover()
  {
    console.log('hehe');
   this.popover.dismiss(this.postData);
  }
  test(){

    let professionalFee1 = (<HTMLInputElement>document.getElementById("input-professionalFee")).value;
    let remarks1 = (<HTMLInputElement>document.getElementById("input-remarks")).value;


  }

  save(){
    let method="";
    let professionalFee1 = (<HTMLInputElement>document.getElementById("input-professionalFee")).value;
    let remarks1 = (<HTMLInputElement>document.getElementById("input-remarks")).value;
    console.log("professionalFee1 : "+professionalFee1+" --- "+"remarks1 : "+remarks1);
    if(this.method == "POST"){
      method="POST";
    }else if(this.professionalFee == professionalFee1 && this.remarks == remarks1){
      console.log("nothing1");
      method ="NOTHING";
    }else if(this.method =="" && professionalFee1 != "0"){
      method ="PUT";
    }else if(this.method =="" && professionalFee1 == "0"){
      method ="DELETE";
    }else if(this.method =="" && professionalFee1 == ""){
      console.log("nothing2");
      method ="NOTHING";
    }
    let postData = {
      professionalFee: professionalFee1,
      remarks: remarks1,
      method:method
    };

    this.popover.dismiss(postData);
  }
  
}
