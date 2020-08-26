import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { InPatientDetailPage } from "./in-patient-detail.page";

describe("InPatientDetailPage", () => {
  let component: InPatientDetailPage;
  let fixture: ComponentFixture<InPatientDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InPatientDetailPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(InPatientDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
