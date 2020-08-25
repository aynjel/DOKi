import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppHospitalSelectorWithAllComponent } from './chh-app-hospital-selector-with-all.component';

describe('ChhAppHospitalSelectorWithAllComponent', () => {
  let component: ChhAppHospitalSelectorWithAllComponent;
  let fixture: ComponentFixture<ChhAppHospitalSelectorWithAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppHospitalSelectorWithAllComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppHospitalSelectorWithAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
