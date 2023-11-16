import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoapShowHide2Component } from './soap-show-hide2.component';

describe('SoapShowHide2Component', () => {
  let component: SoapShowHide2Component;
  let fixture: ComponentFixture<SoapShowHide2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoapShowHide2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoapShowHide2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
