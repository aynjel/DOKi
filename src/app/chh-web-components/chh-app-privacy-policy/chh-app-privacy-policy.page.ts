import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chh-app-privacy-policy',
  templateUrl: './chh-app-privacy-policy.page.html',
  styleUrls: ['./chh-app-privacy-policy.page.scss'],
})
export class ChhAppPrivacyPolicyPage implements OnInit {
  uxSaveCancel:boolean = true;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalController.dismiss(false);
  }
  save(){
     this.modalController.dismiss(true);
  }
  accept(){
    this.uxSaveCancel = false;
  }
}
