import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TabAppointmentsPage } from './tab-appointments.page';
import { Constants } from "../shared/constants";

constants: Constants

describe('TabAppointmentsPage', () => {
  let component: TabAppointmentsPage;
  let fixture: ComponentFixture<TabAppointmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabAppointmentsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabAppointmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

