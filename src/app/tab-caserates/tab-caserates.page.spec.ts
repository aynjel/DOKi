import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabCaseratesPage } from './tab-caserates.page';

describe('TabCaseratesPage', () => {
  let component: TabCaseratesPage;
  let fixture: ComponentFixture<TabCaseratesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCaseratesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabCaseratesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
