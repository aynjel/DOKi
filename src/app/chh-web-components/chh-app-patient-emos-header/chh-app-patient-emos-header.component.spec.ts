import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppPatientEmosHeaderComponent } from './chh-app-patient-emos-header.component';

describe('ChhAppPatientEmosHeaderComponent', () => {
  let component: ChhAppPatientEmosHeaderComponent;
  let fixture: ComponentFixture<ChhAppPatientEmosHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppPatientEmosHeaderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppPatientEmosHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
