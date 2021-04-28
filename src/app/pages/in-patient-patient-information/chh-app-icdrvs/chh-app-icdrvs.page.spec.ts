import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppIcdrvsPage } from './chh-app-icdrvs.page';

describe('ChhAppIcdrvsPage', () => {
  let component: ChhAppIcdrvsPage;
  let fixture: ComponentFixture<ChhAppIcdrvsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppIcdrvsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppIcdrvsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
