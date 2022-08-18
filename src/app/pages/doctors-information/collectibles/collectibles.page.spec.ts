import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollectiblesPage } from './collectibles.page';

describe('CollectiblesPage', () => {
  let component: CollectiblesPage;
  let fixture: ComponentFixture<CollectiblesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectiblesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
