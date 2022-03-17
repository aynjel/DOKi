import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'history-card',
  templateUrl: './progressnotes-history-card.component.html',
  styleUrls: ['./progressnotes-history-card.component.scss'],
})
export class ProgressnotesHistoryCardComponent implements OnInit {
  @ViewChild(IonContent) ionContent: IonContent;
  @Input() dateCreateConverted: any;
  @Input() dateCreateTimeConverted: any;
  @Input() counter: any;
  @Input() notesmall: any;
  @Input() notes: any;
  @Input() noteslength: any;
  @Input() user_created: any;
  @Input() type: any;
  @Input() public scroller: any;
  truncating: boolean = true;
  testss: any = 't';
  user_: any;
  toBot: boolean = false;
  constructor() {}

  getType() {
    if (this.type == 'progressnotes') {
      return 'progressnotes';
    } else if (this.type == 'comment' && this.user_ == this.user_created) {
      return 'commentme';
    } else {
      return 'commentthem';
    }
  }
  ngOnInit() {
    console.log('ngOnInit', this.user_created);

    this.toBot = true;
    this.user_ = atob(localStorage.getItem('username'));
  }

  process() {
    this.truncating = !this.truncating;
    if (this.truncating) {
      let todayItem = document.getElementById('asdasd' + this.counter);
      todayItem.scrollIntoView(true);
    }
  }
}
