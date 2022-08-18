import { Component, Input, OnInit, Output } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-approve-pop-over',
  templateUrl: './approve-pop-over.component.html',
  styleUrls: ['./approve-pop-over.component.scss'],
})
export class ApprovePopOverComponent implements OnInit {
  @Input() dataJson: any;
  constructor(private alrt: PopoverController) {}

  ngOnInit() {}
  onClick() {
    this.alrt.dismiss(this.dataJson.trans_no);
  }
}
