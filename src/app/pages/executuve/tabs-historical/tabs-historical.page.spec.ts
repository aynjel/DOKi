import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsHistoricalPage } from './tabs-historical.page';

describe('TabsHistoricalPage', () => {
  let component: TabsHistoricalPage;
  let fixture: ComponentFixture<TabsHistoricalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsHistoricalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsHistoricalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
