import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabNotificationPage } from './tab-notification.page';

describe('TabNotificationPage', () => {
  let component: TabNotificationPage;
  let fixture: ComponentFixture<TabNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
