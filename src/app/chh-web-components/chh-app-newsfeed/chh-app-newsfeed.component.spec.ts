import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppNewsfeedComponent } from './chh-app-newsfeed.component';

describe('ChhAppNewsfeedComponent', () => {
  let component: ChhAppNewsfeedComponent;
  let fixture: ComponentFixture<ChhAppNewsfeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppNewsfeedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppNewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
