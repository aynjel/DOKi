import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchMedicalabstractPage } from './search-medicalabstract.page';

describe('SearchMedicalabstractPage', () => {
  let component: SearchMedicalabstractPage;
  let fixture: ComponentFixture<SearchMedicalabstractPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMedicalabstractPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMedicalabstractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
