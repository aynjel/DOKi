import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppTestHematologyComponent } from './chh-app-test-hematology.component';

describe('ChhAppTestHematologyComponent', () => {
  let component: ChhAppTestHematologyComponent;
  let fixture: ComponentFixture<ChhAppTestHematologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppTestHematologyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppTestHematologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
