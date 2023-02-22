import { Component, Input, OnInit } from "@angular/core";
import { FunctionsService } from "src/app/shared/functions/functions.service";

@Component({
  selector: "app-soap-show-hide",
  templateUrl: "./soap-show-hide.component.html",
  styleUrls: ["./soap-show-hide.component.scss"],
})
export class SoapShowHideComponent implements OnInit {
  @Input() SOAP: any;
  @Input() comment: any;
  comment_small;
  noteslength;
  constructor(public funcServ: FunctionsService) {}
  truncating: boolean;
  ngOnInit() {
    this.noteslength = this.comment.length;
    //console.log(this.noteslength);
    //console.log(this.comment);

    if (this.comment.length >= 150) {
      this.noteslength = true;
      this.truncating = true;
      this.comment_small = this.funcServ.truncateChar(this.comment, 150);
      this.comment_small = this.comment_small.toUpperCase();
    } else {
      this.noteslength = false;
      this.truncating = false;
    }

    this.comment = this.comment.toUpperCase();
  }
  process() {
    //console.log('asdasd');

    this.truncating = !this.truncating;
  }
}
