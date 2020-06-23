import { Component, OnInit, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FeePage } from '../fee/fee.page';
import { from } from 'rxjs';
import { PopoverController } from '@ionic/angular';  
@Component({
  selector: 'app-inpatientmodal',
  templateUrl: './inpatientmodal.page.html',
  styleUrls: ['./inpatientmodal.page.scss'],
})
export class InpatientmodalPage implements OnInit {
  @Input() data: any;
  constructor(private modalController: ModalController,
    private popover:PopoverController) { }

  ngOnInit() {
    console.log(this.data);
  }

  dateChanged(data1:any){
    console.log("changed data: "+data1);

  }
  async detail(data:any) {
      const popover = await this.popover.create({
        component: FeePage,
        showBackdrop:true,
        translucent: true
      });
      popover.present();
      return popover.onDidDismiss().then(
        (data: any) => {
          if (data) {
            console.log("+++++"+JSON.stringify(data));
            // trigger here the method dependind on the popover response
          }
        }
    );
  }


  async closeModal() {
    await this.modalController.dismiss();
  }

}
