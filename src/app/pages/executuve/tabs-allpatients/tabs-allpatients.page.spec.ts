import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsAllpatientsPage } from './tabs-allpatients.page';

describe('TabsAllpatientsPage', () => {
  let component: TabsAllpatientsPage;
  let fixture: ComponentFixture<TabsAllpatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsAllpatientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsAllpatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
