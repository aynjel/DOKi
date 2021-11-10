import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsDashboardPage } from './tabs-dashboard.page';

describe('TabsDashboardPage', () => {
  let component: TabsDashboardPage;
  let fixture: ComponentFixture<TabsDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
