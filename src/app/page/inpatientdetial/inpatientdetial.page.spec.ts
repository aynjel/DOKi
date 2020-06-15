import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InpatientdetialPage } from './inpatientdetial.page';

describe('InpatientdetialPage', () => {
  let component: InpatientdetialPage;
  let fixture: ComponentFixture<InpatientdetialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpatientdetialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InpatientdetialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
