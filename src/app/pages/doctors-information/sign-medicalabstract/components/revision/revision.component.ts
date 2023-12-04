import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-revision",
  templateUrl: "./revision.component.html",
  styleUrls: ["./revision.component.scss"],
})
export class RevisionComponent implements OnInit {
  constructor(private modal: ModalController) {}
  data;
  ngOnInit() {}
  cancel() {
    this.data = "";
    this.modal.dismiss("", "cancel");
  }
  confirm() {
    this.modal.dismiss(this.data, "confirm");
    this.data = "";
  }
}
