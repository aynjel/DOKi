import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewMedcertPage } from './view-medcert.page';

describe('ViewMedcertPage', () => {
  let component: ViewMedcertPage;
  let fixture: ComponentFixture<ViewMedcertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMedcertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewMedcertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
