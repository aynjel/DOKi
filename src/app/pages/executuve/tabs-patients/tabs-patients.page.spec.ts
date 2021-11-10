import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsPatientsPage } from './tabs-patients.page';

describe('TabsPatientsPage', () => {
  let component: TabsPatientsPage;
  let fixture: ComponentFixture<TabsPatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsPatientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
