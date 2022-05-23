import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalAbstractPage } from './medical-abstract.page';

describe('MedicalAbstractPage', () => {
  let component: MedicalAbstractPage;
  let fixture: ComponentFixture<MedicalAbstractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAbstractPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalAbstractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
