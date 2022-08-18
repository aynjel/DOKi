import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppProfessionalFeeSummaryPage } from './chh-app-professional-fee-summary.page';

describe('ChhAppProfessionalFeeSummaryPage', () => {
  let component: ChhAppProfessionalFeeSummaryPage;
  let fixture: ComponentFixture<ChhAppProfessionalFeeSummaryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppProfessionalFeeSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppProfessionalFeeSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
