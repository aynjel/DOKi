import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-dateselector',
  templateUrl: './dateselector.component.html',
  styleUrls: ['./dateselector.component.scss'],
})
export class DateselectorComponent implements OnInit {
  @Input() passedDate:any;
  @Output() dateSelector: EventEmitter<any> = new EventEmitter();
  selectedDate:any;
  customPickerOptions: any;
  constructor() {

    this.customPickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
     
          }
        },
        {
          text: 'Ok',
          handler: (res:any) => {
  let parseddata = JSON.stringify(res);
  var obj = JSON.parse(parseddata);
  this.selectedDate = obj.year.value+'-'+obj.month.value+'-'+obj.day.value;
  this.dateSelector.emit(obj.year.value+'-'+obj.month.value+'-'+obj.day.value);
          }
        }
    ]
    }
  
   }

  ngOnInit() {
    this.selectedDate = this.yyyymmdd();
  }

  adjustDate(data1:any){
    this.selectedDate = this.incrementDate(this.selectedDate,data1);
    console.log(this.selectedDate);
    this.dateSelector.emit(this.selectedDate);
  }
  yyyymmdd() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    return '' + y+"-" + mm+"-"  + dd;
  }
  incrementDate(date_str, incrementor) {
    var parts = date_str.split("-");
    var dt = new Date(
        parseInt(parts[0], 10),      // year
        parseInt(parts[1], 10) - 1,  // month (starts with 0)
        parseInt(parts[2], 10)       // date
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
