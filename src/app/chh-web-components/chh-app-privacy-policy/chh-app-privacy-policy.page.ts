import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chh-app-privacy-policy',
  templateUrl: './chh-app-privacy-policy.page.html',
  styleUrls: ['./chh-app-privacy-policy.page.scss'],
})
export class ChhAppPrivacyPolicyPage implements OnInit {
  @Input() origin: string;
  @Input() lastName: string;
  @Input() middleInitial: string;
  uxSaveCancel:boolean = true;
  constructor(public modalController: ModalController) { }
  isButtonColor1:boolean=true;
  isButtonColor2:boolean=true;
  ngOnInit() {
    //console.log('asdasdasdasd');
    console.log(this.origin);
    
    
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
  public getColor1() {
    return this.isButtonColor1 ? 'primary' : 'light';
  }
  public getColor2() {
    return this.isButtonColor2 ? 'danger' : 'light';
  }
  accept1(){
    this.isButtonColor1 = true;
    this.isButtonColor2 = false;
  }
  decline1(){
    this.isButtonColor1 = false;
    this.isButtonColor2 = true;
  }
}
