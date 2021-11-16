import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientDetailPage } from './patient-detail.page';

describe('PatientDetailPage', () => {
  let component: PatientDetailPage;
  let fixture: ComponentFixture<PatientDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
