import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppSliderPage } from "./chh-app-slider.page";

describe("ChhAppSliderPage", () => {
  let component: ChhAppSliderPage;
  let fixture: ComponentFixture<ChhAppSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppSliderPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
