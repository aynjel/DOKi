import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppPatientHeaderComponent } from './chh-app-patient-header.component';

describe('ChhAppPatientHeaderComponent', () => {
  let component: ChhAppPatientHeaderComponent;
  let fixture: ComponentFixture<ChhAppPatientHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppPatientHeaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppPatientHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
