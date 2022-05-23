import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { ChhAppDateSelectorComponent } from "./chh-app-date-selector.component";

describe("ChhAppDateSelectorComponent", () => {
  let component: ChhAppDateSelectorComponent;
  let fixture: ComponentFixture<ChhAppDateSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChhAppDateSelectorComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
