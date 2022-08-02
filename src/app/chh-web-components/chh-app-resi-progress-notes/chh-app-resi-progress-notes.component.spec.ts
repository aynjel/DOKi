import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChhAppResiProgressNotesComponent } from './chh-app-resi-progress-notes.component';

describe('ChhAppResiProgressNotesComponent', () => {
  let component: ChhAppResiProgressNotesComponent;
  let fixture: ComponentFixture<ChhAppResiProgressNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChhAppResiProgressNotesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChhAppResiProgressNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
