import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppInPatientModalPage } from "./chh-app-in-patient-modal.page";

describe("ChhAppInPatientModalPage", () => {
  let component: ChhAppInPatientModalPage;
  let fixture: ComponentFixture<ChhAppInPatientModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppInPatientModalPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppInPatientModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
