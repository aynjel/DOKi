import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppAdmittingDiagnosisComponent } from './chh-app-admitting-diagnosis.component';

describe('ChhAppAdmittingDiagnosisComponent', () => {
  let component: ChhAppAdmittingDiagnosisComponent;
  let fixture: ComponentFixture<ChhAppAdmittingDiagnosisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppAdmittingDiagnosisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppAdmittingDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
