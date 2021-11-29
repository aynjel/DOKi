import { Component, OnInit,  Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chh-app-newsfeed',
  templateUrl: './chh-app-newsfeed.component.html',
  styleUrls: ['./chh-app-newsfeed.component.scss'],
})
export class ChhAppNewsfeedComponent implements OnInit {
  @Input() data: any;
  constructor(    public modalController: ModalController) { }

  ngOnInit() {
    //console.log('-----------------');
    //console.log(this.data);
  }
  async closeModal() {
    await this.modalController.dismiss('none');
  }


}
