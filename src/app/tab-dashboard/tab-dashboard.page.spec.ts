import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabDashboardPage } from './tab-dashboard.page';

describe('TabDashboardPage', () => {
  let component: TabDashboardPage;
  let fixture: ComponentFixture<TabDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
