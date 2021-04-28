import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppInsuranceCoordinatorInquiryComponent } from './chh-app-insurance-coordinator-inquiry.component';

describe('ChhAppInsuranceCoordinatorInquiryComponent', () => {
  let component: ChhAppInsuranceCoordinatorInquiryComponent;
  let fixture: ComponentFixture<ChhAppInsuranceCoordinatorInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppInsuranceCoordinatorInquiryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppInsuranceCoordinatorInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
