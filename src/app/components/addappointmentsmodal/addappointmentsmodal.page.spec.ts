import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddappointmentsmodalPage } from './addappointmentsmodal.page';

describe('AddappointmentsmodalPage', () => {
  let component: AddappointmentsmodalPage;
  let fixture: ComponentFixture<AddappointmentsmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddappointmentsmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddappointmentsmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
