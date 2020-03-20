import { TestBed } from '@angular/core/testing';

import { VedraxWebLibService } from './vedrax-web-lib.service';

describe('VedraxWebLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VedraxWebLibService = TestBed.get(VedraxWebLibService);
    expect(service).toBeTruthy();
  });
});
