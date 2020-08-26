import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppError404Page } from "./chh-app-error-404.page";

describe("ChhAppError404Page", () => {
  let component: ChhAppError404Page;
  let fixture: ComponentFixture<ChhAppError404Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppError404Page],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppError404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
