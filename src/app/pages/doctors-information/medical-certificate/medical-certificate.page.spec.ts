import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalCertificatePage } from './medical-certificate.page';

describe('MedicalCertificatePage', () => {
  let component: MedicalCertificatePage;
  let fixture: ComponentFixture<MedicalCertificatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalCertificatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
