import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfessionalFeeHelperComponent } from './professional-fee-helper.component';

describe('ProfessionalFeeHelperComponent', () => {
  let component: ProfessionalFeeHelperComponent;
  let fixture: ComponentFixture<ProfessionalFeeHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalFeeHelperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalFeeHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
