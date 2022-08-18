import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-view-comments-pop-over',
  templateUrl: './view-comments-pop-over.component.html',
  styleUrls: ['./view-comments-pop-over.component.scss'],
})
export class ViewCommentsPopOverComponent implements OnInit {
  @Input() dataJson: any;
  constructor(private alrt: PopoverController) {}

  ngOnInit() {}
  onClick() {
    this.alrt.dismiss(this.dataJson.trans_no);
  }
}
