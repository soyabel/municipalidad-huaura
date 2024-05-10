import { TestBed } from '@angular/core/testing';

import { MetodosAuthService } from './metodos-auth.service';

describe('MetodosAuthService', () => {
  let service: MetodosAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodosAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
