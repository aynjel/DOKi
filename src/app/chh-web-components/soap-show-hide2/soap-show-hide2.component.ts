import { Component, OnInit, Input } from "@angular/core";
import { FunctionsService } from "src/app/shared/functions/functions.service";

@Component({
  selector: "app-soap-show-hide2",
  templateUrl: "./soap-show-hide2.component.html",
  styleUrls: ["./soap-show-hide2.component.scss"],
})
export class SoapShowHide2Component implements OnInit {
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
      this.comment_small = this.comment_small
        .toUpperCase()
        .replace(/\n/g, "<br />");
    } else {
      this.noteslength = false;
      this.truncating = false;
    }

    this.comment = this.comment.toUpperCase().replace(/\n/g, "<br />");
  }
  process() {
    //console.log('asdasd');

    this.truncating = !this.truncating;
  }
}
