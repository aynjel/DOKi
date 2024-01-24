import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppChiefComplaintComponent } from './chh-app-chief-complaint.component';

describe('ChhAppChiefComplaintComponent', () => {
  let component: ChhAppChiefComplaintComponent;
  let fixture: ComponentFixture<ChhAppChiefComplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppChiefComplaintComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppChiefComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
