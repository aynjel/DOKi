import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsSettingsPage } from './tabs-settings.page';

describe('TabsSettingsPage', () => {
  let component: TabsSettingsPage;
  let fixture: ComponentFixture<TabsSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
