import { TestBed } from '@angular/core/testing';

import { PackOpeningService } from './pack-opening.service';

describe('PackOpeningService', () => {
  let service: PackOpeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackOpeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
