import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IonCardContent, IonList } from '@ionic/angular';

@Component({
  selector: 'cardshowhide',
  templateUrl: './cardshowhide.component.html',
  styleUrls: ['./cardshowhide.component.scss'],
})
export class CardshowhideComponent implements OnInit {
  @ViewChild(IonCardContent) content: IonCardContent;
  @ViewChild(IonList, { read: ElementRef }) list: ElementRef;
  @Input() notes: any;
  @Input() notesmall: any;
  @Input() noteslength: any;
  @Input() counter: any;
  truncating: boolean = true;
  target = 'target';
  scrollTo = 3;
  constructor() {}

  ngOnInit() {
    //this.scrollListVisible();
  }
  process() {
    this.truncating = !this.truncating;
  }
}
