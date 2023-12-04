import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Revision1Component } from './revision1.component';

describe('Revision1Component', () => {
  let component: Revision1Component;
  let fixture: ComponentFixture<Revision1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Revision1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Revision1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
