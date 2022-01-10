import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabNewsFeedPage } from './tab-news-feed.page';

describe('TabNewsFeedPage', () => {
  let component: TabNewsFeedPage;
  let fixture: ComponentFixture<TabNewsFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNewsFeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabNewsFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
