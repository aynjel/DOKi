import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfessionalFeeSummaryTextsComponent } from './professional-fee-summary-texts.component';

describe('ProfessionalFeeSummaryTextsComponent', () => {
  let component: ProfessionalFeeSummaryTextsComponent;
  let fixture: ComponentFixture<ProfessionalFeeSummaryTextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalFeeSummaryTextsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalFeeSummaryTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
