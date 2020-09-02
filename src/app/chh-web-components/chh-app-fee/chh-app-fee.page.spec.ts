import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppFeePage } from "./chh-app-fee.page";

describe("ChhAppFeePage", () => {
  let component: ChhAppFeePage;
  let fixture: ComponentFixture<ChhAppFeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppFeePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppFeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
