import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MandaueLabDetailsComponent } from './mandaue-lab-details.component';

describe('MandaueLabDetailsComponent', () => {
  let component: MandaueLabDetailsComponent;
  let fixture: ComponentFixture<MandaueLabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MandaueLabDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MandaueLabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
