import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAppointmentsModalPage } from './chh-app-add-appointments-modal.page';

describe('AddAppointmentsModalPage', () => {
  let component: AddAppointmentsModalPage;
  let fixture: ComponentFixture<AddAppointmentsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppointmentsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAppointmentsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
