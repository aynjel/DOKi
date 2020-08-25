import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppInpatientmodalPage } from './chh-app-in-patient-modal.page';

describe('ChhAppInpatientmodalPage', () => {
  let component: ChhAppInpatientmodalPage;
  let fixture: ComponentFixture<ChhAppInpatientmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppInpatientmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppInpatientmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
