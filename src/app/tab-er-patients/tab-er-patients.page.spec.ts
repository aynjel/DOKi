import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabErPatientsPage } from './tab-er-patients.page';

describe('TabErPatientsPage', () => {
  let component: TabErPatientsPage;
  let fixture: ComponentFixture<TabErPatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabErPatientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabErPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
