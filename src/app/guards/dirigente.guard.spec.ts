import { TestBed } from '@angular/core/testing';

import { DirigenteGuard } from './dirigente.guard';

describe('DirigenteGuard', () => {
  let guard: DirigenteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirigenteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
