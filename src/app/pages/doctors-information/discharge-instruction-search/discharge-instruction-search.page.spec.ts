import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DischargeInstructionSearchPage } from './discharge-instruction-search.page';

describe('DischargeInstructionSearchPage', () => {
  let component: DischargeInstructionSearchPage;
  let fixture: ComponentFixture<DischargeInstructionSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DischargeInstructionSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DischargeInstructionSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
