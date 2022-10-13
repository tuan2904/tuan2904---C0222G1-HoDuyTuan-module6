import {Component, OnInit} from '@angular/core';
import {StatisticsCustomer} from '../../../model/statistics-customer';
import {ProductService} from '../../../service/product.service';

@Component({
  selector: 'app-statistics-customer',
  templateUrl: './statistics-customer.component.html',
  styleUrls: ['./statistics-customer.component.css']
})
export class StatisticsCustomerComponent implements OnInit {
  statisticsCustomer: StatisticsCustomer[] = [];

  constructor(private orderService: ProductService) {
  }

  ngOnInit(): void {
    this.getStatisticsCustomer();
  }

  getStatisticsCustomer() {
    this.orderService.getStatisticsCustomer().subscribe((data: StatisticsCustomer[]) => {
      this.statisticsCustomer = data;
    });
  }

}
