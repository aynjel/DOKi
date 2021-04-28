import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppCardNewlineComponent } from './chh-app-card-newline.component';

describe('ChhAppCardNewlineComponent', () => {
  let component: ChhAppCardNewlineComponent;
  let fixture: ComponentFixture<ChhAppCardNewlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppCardNewlineComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppCardNewlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
