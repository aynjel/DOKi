import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeeMoreHelperComponent } from './see-more-helper.component';

describe('SeeMoreHelperComponent', () => {
  let component: SeeMoreHelperComponent;
  let fixture: ComponentFixture<SeeMoreHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeMoreHelperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeMoreHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
