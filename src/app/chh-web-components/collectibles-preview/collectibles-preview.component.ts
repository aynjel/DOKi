import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'collectibles',
  templateUrl: './collectibles-preview.component.html',
  styleUrls: ['./collectibles-preview.component.scss'],
})
export class CollectiblesPreviewComponent implements OnInit {
  @Input() amount;
  @Input() name;
  @Input() namePHIC;
  @Input() amountPHIC;
  @Input() amountREADERS;
  @Input() collection_date;
  constructor() {}

  ngOnInit() {}
}
