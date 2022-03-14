import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppLogoSmComponent } from "./chh-app-logo-sm.component";

describe("ChhAppLogoSmComponent", () => {
  let component: ChhAppLogoSmComponent;
  let fixture: ComponentFixture<ChhAppLogoSmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppLogoSmComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppLogoSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
