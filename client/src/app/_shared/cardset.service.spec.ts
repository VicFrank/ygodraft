import { TestBed } from '@angular/core/testing';

import { CardsetService } from './cardset.service';

describe('CardsetService', () => {
  let service: CardsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
