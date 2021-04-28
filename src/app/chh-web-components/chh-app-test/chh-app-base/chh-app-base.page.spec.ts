import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppBasePage } from './chh-app-base.page';

describe('ChhAppBasePage', () => {
  let component: ChhAppBasePage;
  let fixture: ComponentFixture<ChhAppBasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppBasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppBasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
