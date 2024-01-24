import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfessionalFeeErSummaryPatientInfoComponent } from './professional-fee-er-summary-patient-info.component';

describe('ProfessionalFeeErSummaryPatientInfoComponent', () => {
  let component: ProfessionalFeeErSummaryPatientInfoComponent;
  let fixture: ComponentFixture<ProfessionalFeeErSummaryPatientInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalFeeErSummaryPatientInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalFeeErSummaryPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
