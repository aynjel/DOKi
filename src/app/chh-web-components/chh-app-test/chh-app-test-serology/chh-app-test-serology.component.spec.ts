import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppTestSerologyComponent } from './chh-app-test-serology.component';

describe('ChhAppTestSerologyComponent', () => {
  let component: ChhAppTestSerologyComponent;
  let fixture: ComponentFixture<ChhAppTestSerologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppTestSerologyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppTestSerologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
