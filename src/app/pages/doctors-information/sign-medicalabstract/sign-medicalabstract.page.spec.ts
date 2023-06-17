import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignMedicalabstractPage } from './sign-medicalabstract.page';

describe('SignMedicalabstractPage', () => {
  let component: SignMedicalabstractPage;
  let fixture: ComponentFixture<SignMedicalabstractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignMedicalabstractPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignMedicalabstractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
