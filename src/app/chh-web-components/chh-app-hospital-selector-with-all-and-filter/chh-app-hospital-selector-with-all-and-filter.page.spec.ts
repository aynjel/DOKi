import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppHospitalSelectorWithAllAndFilterPage } from "./chh-app-hospital-selector-with-all-and-filter.page";

describe("ChhAppHospitalSelectorWithAllAndFilterPage", () => {
  let component: ChhAppHospitalSelectorWithAllAndFilterPage;
  let fixture: ComponentFixture<ChhAppHospitalSelectorWithAllAndFilterPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppHospitalSelectorWithAllAndFilterPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ChhAppHospitalSelectorWithAllAndFilterPage
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
