import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppIsPatientSeenComponent } from './chh-app-is-patient-seen.component';

describe('ChhAppIsPatientSeenComponent', () => {
  let component: ChhAppIsPatientSeenComponent;
  let fixture: ComponentFixture<ChhAppIsPatientSeenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppIsPatientSeenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppIsPatientSeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
