import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctordirectorydetailComponent } from './doctordirectorydetail.component';

describe('DoctordirectorydetailComponent', () => {
  let component: DoctordirectorydetailComponent;
  let fixture: ComponentFixture<DoctordirectorydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctordirectorydetailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctordirectorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
