import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HospitalSelectorWithAllAndFilterPage } from './hospital-selector-with-all-and-filter.page';

describe('HospitalSelectorWithAllAndFilterPage', () => {
  let component: HospitalSelectorWithAllAndFilterPage;
  let fixture: ComponentFixture<HospitalSelectorWithAllAndFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalSelectorWithAllAndFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalSelectorWithAllAndFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
