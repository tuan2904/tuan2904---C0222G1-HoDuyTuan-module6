import { TestBed } from '@angular/core/testing';

// @ts-ignore
import { ChartjsService } from './chartjs.service';

describe('ChartjsService', () => {
  let service: ChartjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
