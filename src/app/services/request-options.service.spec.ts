import { TestBed } from '@angular/core/testing';

import { RequestOptionsService } from './request-options.service';

describe('RequestOptionsService', () => {
  let service: RequestOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
