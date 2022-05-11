import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignMedcertPage } from './sign-medcert.page';

describe('SignMedcertPage', () => {
  let component: SignMedcertPage;
  let fixture: ComponentFixture<SignMedcertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignMedcertPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignMedcertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
