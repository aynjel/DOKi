import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsDoctorsdirectoryPage } from './tabs-doctorsdirectory.page';

describe('TabsDoctorsdirectoryPage', () => {
  let component: TabsDoctorsdirectoryPage;
  let fixture: ComponentFixture<TabsDoctorsdirectoryPage>;

  beforeEach(waitForAsync(() => {
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
