import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppTestFecalysisComponent } from './chh-app-test-fecalysis.component';

describe('ChhAppTestFecalysisComponent', () => {
  let component: ChhAppTestFecalysisComponent;
  let fixture: ComponentFixture<ChhAppTestFecalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppTestFecalysisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppTestFecalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
