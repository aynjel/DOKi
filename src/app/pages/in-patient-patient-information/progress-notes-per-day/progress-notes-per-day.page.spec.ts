import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgressNotesPerDayPage } from './progress-notes-per-day.page';

describe('ProgressNotesPerDayPage', () => {
  let component: ProgressNotesPerDayPage;
  let fixture: ComponentFixture<ProgressNotesPerDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressNotesPerDayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressNotesPerDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
