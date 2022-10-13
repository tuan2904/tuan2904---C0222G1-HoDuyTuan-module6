import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsCustomerComponent } from './statistics-customer.component';

describe('StatisticsCustomerComponent', () => {
  let component: StatisticsCustomerComponent;
  let fixture: ComponentFixture<StatisticsCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
