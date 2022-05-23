import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppAddAppointmentsModalPage } from "./chh-app-add-appointments-modal.page";

describe("ChhAppAddAppointmentsModalPage", () => {
  let component: ChhAppAddAppointmentsModalPage;
  let fixture: ComponentFixture<ChhAppAddAppointmentsModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppAddAppointmentsModalPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppAddAppointmentsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
