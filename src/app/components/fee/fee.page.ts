import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-fee',
  templateUrl: './fee.page.html',
  styleUrls: ['./fee.page.scss'],
})
export class FeePage implements OnInit {
  public postData = {
    professionalFee: '',
    remarks: ''
  };
    
 
  constructor(private modalController: ModalController,
    private popover:PopoverController
    ) { }

  ngOnInit() {
  }
  ClosePopover()
  {
    console.log('hehe');
   this.popover.dismiss();
  }

  save(){
    var professionalFee = (<HTMLInputElement>document.getElementById("input-professionalFee")).value;
    var remarks = (<HTMLInputElement>document.getElementById("input-remarks")).value;
   
    let postData = {
      professionalFee: professionalFee,
      remarks: remarks
    };

    this.popover.dismiss(postData);
  }
  
}
