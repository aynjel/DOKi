import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppHospitalSelectorWithAllAndFilterEdComponent } from './chh-app-hospital-selector-with-all-and-filter-ed.component';

describe('ChhAppHospitalSelectorWithAllAndFilterEdComponent', () => {
  let component: ChhAppHospitalSelectorWithAllAndFilterEdComponent;
  let fixture: ComponentFixture<ChhAppHospitalSelectorWithAllAndFilterEdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppHospitalSelectorWithAllAndFilterEdComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppHospitalSelectorWithAllAndFilterEdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
