import { Component, Input, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/shared/functions/functions.service';

@Component({
  selector: 'see-more',
  templateUrl: './see-more-helper.component.html',
  styleUrls: ['./see-more-helper.component.scss'],
})
export class SeeMoreHelperComponent implements OnInit {
  @Input() final_diagnosis: any;
  @Input() greaterThan: any;
  final_diagnosis_small;
  showBtn: boolean = false;
  constructor(public functionsService: FunctionsService) {}
  ngOnInit() {
    if (this.final_diagnosis.length > this.greaterThan) {
      this.showBtn = true;
      this.final_diagnosis_small = this.functionsService.truncateChar(
        this.final_diagnosis,
        this.greaterThan
      );
    } else {
      this.showBtn = false;
      this.final_diagnosis_small = this.final_diagnosis;
    }
  }
  truncating: boolean = true;
  process() {
    this.truncating = !this.truncating;
  }
}
