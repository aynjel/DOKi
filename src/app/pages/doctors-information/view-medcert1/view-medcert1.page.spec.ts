import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMedcert1Page } from './view-medcert1.page';

describe('ViewMedcert1Page', () => {
  let component: ViewMedcert1Page;
  let fixture: ComponentFixture<ViewMedcert1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMedcert1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMedcert1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
