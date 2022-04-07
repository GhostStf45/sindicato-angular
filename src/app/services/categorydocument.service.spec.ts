import { TestBed } from '@angular/core/testing';

import { CategorydocumentService } from './categorydocument.service';

describe('CategorydocumentService', () => {
  let service: CategorydocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorydocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
