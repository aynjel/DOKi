import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaseRatesPage } from './case-rates.page';

describe('CaseRatesPage', () => {
  let component: CaseRatesPage;
  let fixture: ComponentFixture<CaseRatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseRatesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseRatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
