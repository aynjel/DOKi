import { TestBed } from '@angular/core/testing';

import { ResiService } from './resi.service';

describe('ResiService', () => {
  let service: ResiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
