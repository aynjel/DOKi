import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-soap-handler",
  templateUrl: "./soap-handler.component.html",
  styleUrls: ["./soap-handler.component.scss"],
})
export class SoapHandlerComponent implements OnInit {
  @Input() SOAPdata;
  SOAPdata1;
  isOAPEmpty: boolean = false;
  constructor() {}
  checkOAPNotesEmpty(notes) {
    const oapNotes = notes.filter((note) =>
      ["O", "A", "P"].includes(note.note_type)
    );
    const isOAPNotesEmpty = oapNotes.every((note) => note.notes.trim() === "");

    if (isOAPNotesEmpty) {
      this.isOAPEmpty = true;
    } else {
      this.isOAPEmpty = false;
    }
  }
  trimNotesWhitespace(data) {
    return data.map((item) => {
      item.notes = item.notes.trim();
      return item;
    });
  }
  ngOnInit() {
    this.SOAPdata = this.trimNotesWhitespace(this.SOAPdata);
    this.checkOAPNotesEmpty(this.SOAPdata);
  }
}
