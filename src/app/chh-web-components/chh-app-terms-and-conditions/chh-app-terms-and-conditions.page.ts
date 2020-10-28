import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chh-app-terms-and-conditions',
  templateUrl: './chh-app-terms-and-conditions.page.html',
  styleUrls: ['./chh-app-terms-and-conditions.page.scss'],
})
export class ChhAppTermsAndConditionsPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalController.dismiss(false);
  }
}
