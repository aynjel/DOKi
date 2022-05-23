import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfessionalFeeSummaryPatientInfoComponent } from './professional-fee-summary-patient-info.component';

describe('ProfessionalFeeSummaryPatientInfoComponent', () => {
  let component: ProfessionalFeeSummaryPatientInfoComponent;
  let fixture: ComponentFixture<ProfessionalFeeSummaryPatientInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalFeeSummaryPatientInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalFeeSummaryPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
