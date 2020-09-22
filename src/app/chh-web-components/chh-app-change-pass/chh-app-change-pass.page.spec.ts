import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppChangePassPage } from './chh-app-change-pass.page';

describe('ChhAppChangePassPage', () => {
  let component: ChhAppChangePassPage;
  let fixture: ComponentFixture<ChhAppChangePassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppChangePassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppChangePassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
