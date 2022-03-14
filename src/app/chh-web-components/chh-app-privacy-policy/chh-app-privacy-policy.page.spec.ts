import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppPrivacyPolicyPage } from './chh-app-privacy-policy.page';

describe('ChhAppPrivacyPolicyPage', () => {
  let component: ChhAppPrivacyPolicyPage;
  let fixture: ComponentFixture<ChhAppPrivacyPolicyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppPrivacyPolicyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppPrivacyPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
