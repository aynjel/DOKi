import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsErlistPage } from './tabs-erlist.page';

describe('TabsErlistPage', () => {
  let component: TabsErlistPage;
  let fixture: ComponentFixture<TabsErlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsErlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsErlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
