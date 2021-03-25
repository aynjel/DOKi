import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppFinalDiagnosisComponent } from './chh-app-final-diagnosis.component';

describe('ChhAppFinalDiagnosisComponent', () => {
  let component: ChhAppFinalDiagnosisComponent;
  let fixture: ComponentFixture<ChhAppFinalDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppFinalDiagnosisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppFinalDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
