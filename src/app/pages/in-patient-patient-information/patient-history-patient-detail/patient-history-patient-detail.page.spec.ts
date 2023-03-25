import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientHistoryPatientDetailPage } from './patient-history-patient-detail.page';

describe('PatientHistoryPatientDetailPage', () => {
  let component: PatientHistoryPatientDetailPage;
  let fixture: ComponentFixture<PatientHistoryPatientDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistoryPatientDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientHistoryPatientDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
