import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PharmaPage } from './pharma.page';

describe('PharmaPage', () => {
  let component: PharmaPage;
  let fixture: ComponentFixture<PharmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PharmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
