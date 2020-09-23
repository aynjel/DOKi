import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { TabInPatientsPage } from "./tab-in-patients.page";

describe("TabInPatientsPage", () => {
  let component: TabInPatientsPage;
  let fixture: ComponentFixture<TabInPatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabInPatientsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(TabInPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
