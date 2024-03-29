import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppExecutiveDeptComponent } from './chh-app-executive-dept.component';

describe('ChhAppExecutiveDeptComponent', () => {
  let component: ChhAppExecutiveDeptComponent;
  let fixture: ComponentFixture<ChhAppExecutiveDeptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppExecutiveDeptComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppExecutiveDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
