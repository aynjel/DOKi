import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chh-app-newsfeed',
  templateUrl: './chh-app-newsfeed.component.html',
  styleUrls: ['./chh-app-newsfeed.component.scss'],
})
export class ChhAppNewsfeedComponent implements OnInit {
  @Input() data: any;
  constructor(public modalController: ModalController) {}

  ngOnInit() {
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
  }
  async closeModal() {
    await this.modalController.dismiss('none');
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }
}
