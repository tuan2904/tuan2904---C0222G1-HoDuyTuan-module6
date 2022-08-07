import { TestBed } from '@angular/core/testing';

import { IchartjsService } from './ichartjs.service';

describe('IchartjsService', () => {
  let service: IchartjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IchartjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
