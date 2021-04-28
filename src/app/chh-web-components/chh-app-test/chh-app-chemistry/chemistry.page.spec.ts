import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChemistryPage } from './chemistry.page';

describe('ChemistryPage', () => {
  let component: ChemistryPage;
  let fixture: ComponentFixture<ChemistryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemistryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChemistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
