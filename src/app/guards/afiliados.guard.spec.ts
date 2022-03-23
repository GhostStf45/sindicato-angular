import { TestBed } from '@angular/core/testing';

import { AfiliadosGuard } from './afiliados.guard';

describe('AfiliadosGuard', () => {
  let guard: AfiliadosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AfiliadosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
