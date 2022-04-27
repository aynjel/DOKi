import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  isNotification: boolean;
  selected = 'Final Diagnosis';
  constructor(private navCtrl: NavController) {
    this.isNotification = true;
  }

  ngOnInit() {}
  back() {
    this.navCtrl.back();
  }
  segmentChanged(e) {
    console.log(e.detail.value);
  }
}
