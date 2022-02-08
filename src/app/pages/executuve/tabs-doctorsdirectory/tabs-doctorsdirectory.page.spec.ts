import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsDoctorsdirectoryPage } from './tabs-doctorsdirectory.page';

describe('TabsDoctorsdirectoryPage', () => {
  let component: TabsDoctorsdirectoryPage;
  let fixture: ComponentFixture<TabsDoctorsdirectoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsDoctorsdirectoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsDoctorsdirectoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
