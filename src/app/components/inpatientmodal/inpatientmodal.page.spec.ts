import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InpatientmodalPage } from './inpatientmodal.page';

describe('InpatientmodalPage', () => {
  let component: InpatientmodalPage;
  let fixture: ComponentFixture<InpatientmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpatientmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InpatientmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
