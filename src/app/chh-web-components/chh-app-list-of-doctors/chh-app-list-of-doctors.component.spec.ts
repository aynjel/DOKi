import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppListOfDoctorsComponent } from './chh-app-list-of-doctors.component';

describe('ChhAppListOfDoctorsComponent', () => {
  let component: ChhAppListOfDoctorsComponent;
  let fixture: ComponentFixture<ChhAppListOfDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppListOfDoctorsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppListOfDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
