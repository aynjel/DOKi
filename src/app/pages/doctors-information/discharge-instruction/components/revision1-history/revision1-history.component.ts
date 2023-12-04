import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-revision1-history",
  templateUrl: "./revision1-history.component.html",
  styleUrls: ["./revision1-history.component.scss"],
})
export class Revision1HistoryComponent implements OnInit {
  @Input() json;
  constructor(private modal: ModalController) {}
  data;
  ngOnInit() {
    console.log(this.json);
  }
  cancel() {
    this.modal.dismiss("", "cancel");
    this.data = "";
  }
  confirm() {
    this.modal.dismiss(this.data, "confirm");
    this.data = "";
  }
}
