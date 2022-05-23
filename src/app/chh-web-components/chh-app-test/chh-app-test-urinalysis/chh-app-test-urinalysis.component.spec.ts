import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppTestUrinalysisComponent } from './chh-app-test-urinalysis.component';

describe('ChhAppTestUrinalysisComponent', () => {
  let component: ChhAppTestUrinalysisComponent;
  let fixture: ComponentFixture<ChhAppTestUrinalysisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppTestUrinalysisComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppTestUrinalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
