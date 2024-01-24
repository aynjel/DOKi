import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErPatientDetailPage } from './er-patient-detail.page';

describe('ErPatientDetailPage', () => {
  let component: ErPatientDetailPage;
  let fixture: ComponentFixture<ErPatientDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErPatientDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErPatientDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
