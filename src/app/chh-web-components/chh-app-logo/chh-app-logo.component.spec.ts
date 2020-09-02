import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppLogoComponent } from "./chh-app-logo.component";

describe("ChhAppLogoComponent", () => {
  let component: ChhAppLogoComponent;
  let fixture: ComponentFixture<ChhAppLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppLogoComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
