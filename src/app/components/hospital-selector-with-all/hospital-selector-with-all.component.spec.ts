import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitalSelectorWithAllComponent } from './hospital-selector-with-all.component';

describe('HospitalSelectorWithAllComponent', () => {
  let component: HospitalSelectorWithAllComponent;
  let fixture: ComponentFixture<HospitalSelectorWithAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalSelectorWithAllComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalSelectorWithAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
