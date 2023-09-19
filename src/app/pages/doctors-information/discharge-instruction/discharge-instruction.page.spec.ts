import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DischargeInstructionPage } from './discharge-instruction.page';

describe('DischargeInstructionPage', () => {
  let component: DischargeInstructionPage;
  let fixture: ComponentFixture<DischargeInstructionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargeInstructionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DischargeInstructionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
