import { TestBed } from '@angular/core/testing';

import { Idx } from './idx';

describe('Idx', () => {
  let service: Idx;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Idx);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
