import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardshowhideComponent } from './cardshowhide.component';

describe('CardshowhideComponent', () => {
  let component: CardshowhideComponent;
  let fixture: ComponentFixture<CardshowhideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardshowhideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardshowhideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
