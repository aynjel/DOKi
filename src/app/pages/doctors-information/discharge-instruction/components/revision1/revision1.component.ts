import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-revision1",
  templateUrl: "./revision1.component.html",
  styleUrls: ["./revision1.component.scss"],
})
export class Revision1Component implements OnInit {
  constructor(private modal: ModalController) {}
  data;
  ngOnInit() {}
  cancel() {
    this.modal.dismiss("", "cancel");
    this.data = "";
  }
  confirm() {
    this.modal.dismiss(this.data, "confirm");
    this.data = "";
  }
}
