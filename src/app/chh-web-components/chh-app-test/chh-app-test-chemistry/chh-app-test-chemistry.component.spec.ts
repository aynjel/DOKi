import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppTestChemistryComponent } from './chh-app-test-chemistry.component';

describe('ChhAppTestChemistryComponent', () => {
  let component: ChhAppTestChemistryComponent;
  let fixture: ComponentFixture<ChhAppTestChemistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppTestChemistryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppTestChemistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
