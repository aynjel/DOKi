import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppTermsAndConditionsPage } from './chh-app-terms-and-conditions.page';

describe('ChhAppTermsAndConditionsPage', () => {
  let component: ChhAppTermsAndConditionsPage;
  let fixture: ComponentFixture<ChhAppTermsAndConditionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppTermsAndConditionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppTermsAndConditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
