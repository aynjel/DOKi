import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressnotesHistoryCardComponent } from './progressnotes-history-card.component';

describe('ProgressnotesHistoryCardComponent', () => {
  let component: ProgressnotesHistoryCardComponent;
  let fixture: ComponentFixture<ProgressnotesHistoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressnotesHistoryCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressnotesHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
