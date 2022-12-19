import { TestBed } from '@angular/core/testing';

import { OnlineResultService } from './online-result.service';

describe('OnlineResultService', () => {
  let service: OnlineResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
