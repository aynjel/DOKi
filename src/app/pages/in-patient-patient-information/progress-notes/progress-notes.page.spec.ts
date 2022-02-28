import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressNotesPage } from './progress-notes.page';

describe('ProgressNotesPage', () => {
  let component: ProgressNotesPage;
  let fixture: ComponentFixture<ProgressNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressNotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
