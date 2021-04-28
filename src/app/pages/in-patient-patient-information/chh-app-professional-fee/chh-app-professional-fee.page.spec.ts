import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppProfessionalFeePage } from './chh-app-professional-fee.page';

describe('ChhAppProfessionalFeePage', () => {
  let component: ChhAppProfessionalFeePage;
  let fixture: ComponentFixture<ChhAppProfessionalFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppProfessionalFeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppProfessionalFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
