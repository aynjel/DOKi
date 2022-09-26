import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Component({
  selector: 'app-show-hide',
  templateUrl: './show-hide.component.html',
  styleUrls: ['./show-hide.component.scss'],
})
export class ShowHideComponent implements OnInit {
  @Input() comment;
  @Input() dataZoom;
  comment_small;
  noteslength;
  constructor(public funcServ: FunctionsService) {}
  truncating: boolean = false;
  ngOnInit() {
    //console.log('ngOnInit');
    //console.log(this.comment);
    //console.log(this.dataZoom);
    if (this.comment != undefined) {
      if (this.comment.length >= 50) {
        this.truncating = true;
        this.comment_small = this.funcServ.truncateChar(this.comment, 50);
      } else {
        this.truncating = false;
      }
    }
  }
  process() {
    ////console.log('asdasd');

    this.truncating = !this.truncating;
  }
  ngAfterViewInit(): void {
    //console.log('ngAfterViewInit');
    //console.log(this.comment);
    //console.log(this.dataZoom);
  }
  ionViewDidEnter() {
    //console.log('ionViewDidEnter');
    //console.log(this.comment);
    //console.log(this.dataZoom);
  }
  isngAfterViewChecked: boolean = false;
  ngAfterViewChecked() {
    if (!this.isngAfterViewChecked) {
      if (this.comment != undefined) {
        this.isngAfterViewChecked = true;
        this.comment_small = this.funcServ.truncateChar(this.comment, 150);
        if (this.comment.length >= 150) {
          this.noteslength = true;
        }
      }
    }
  }
}
