import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaboratoryTestModalPage } from './laboratory-test-modal.page';

describe('LaboratoryTestModalPage', () => {
  let component: LaboratoryTestModalPage;
  let fixture: ComponentFixture<LaboratoryTestModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryTestModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaboratoryTestModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
