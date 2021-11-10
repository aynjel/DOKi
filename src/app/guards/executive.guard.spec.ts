import { TestBed } from '@angular/core/testing';

import { ExecutiveGuard } from './executive.guard';

describe('ExecutiveGuard', () => {
  let guard: ExecutiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExecutiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
