import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppDesktopNavigationComponent } from './chh-app-desktop-navigation.component';

describe('ChhAppDesktopNavigationComponent', () => {
  let component: ChhAppDesktopNavigationComponent;
  let fixture: ComponentFixture<ChhAppDesktopNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppDesktopNavigationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppDesktopNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
