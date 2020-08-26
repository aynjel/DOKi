import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "chh-app-date-selector",
  templateUrl: "./chh-app-date-selector.component.html",
  styleUrls: ["./chh-app-date-selector.component.scss"],
})

export class ChhAppDateSelectorComponent implements OnInit {
  @Input() passedDate: any;
  @Output() dateSelector: EventEmitter<any> = new EventEmitter();
  selectedDate: any;
  customPickerOptions: any;

  myDate;
  active1: boolean = false;
  active2: boolean = true;
  active3: boolean = false;
  @Input() readonlyComp: boolean;

  constructor() {
    this.customPickerOptions = {
      buttons: [
        {
          text: "Cancel",
          handler: () => {},
        },
        {
          text: "Ok",
          handler: (res: any) => {
            let parseddata = JSON.stringify(res);
            var obj = JSON.parse(parseddata);
            this.selectedDate =
              obj.year.value + "-" + obj.month.value + "-" + obj.day.value;
            this.dateSelector.emit(
              obj.year.value + "-" + obj.month.value + "-" + obj.day.value
            );
          },
        },
      ],
    };
  }

  ngOnInit() {
    this.selectedDate = this.yyyymmdd();
  }

  forceModal() {
    console.log("123");
  }

  adjustDate(data1: any) {
    if (data1 == "-1") {
      this.active1 = true;
      this.active2 = false;
      this.active3 = false;
    }
    if (data1 == "0") {
      this.active1 = false;
      this.active2 = true;
      this.active3 = false;
    }
    if (data1 == "1") {
      this.active1 = false;
      this.active2 = false;
      this.active3 = true;
    }
    this.selectedDate = this.incrementDate(this.selectedDate, data1);
    console.log(this.selectedDate);
    this.dateSelector.emit(this.selectedDate);
  }

  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? "0" + m : m;
    var dd = d < 10 ? "0" + d : d;
    return "" + y + "-" + mm + "-" + dd;
  }
  
  incrementDate(date_str, incrementor) {
    var parts = date_str.split("-");
    var dt = new Date(
      parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setTime(dt.getTime() + incrementor * 86400000);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  }
}
