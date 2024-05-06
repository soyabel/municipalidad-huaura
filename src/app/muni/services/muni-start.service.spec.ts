import { TestBed } from '@angular/core/testing';

import { MuniStartService } from './muni-start.service';

describe('MuniStartService', () => {
  let service: MuniStartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuniStartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
