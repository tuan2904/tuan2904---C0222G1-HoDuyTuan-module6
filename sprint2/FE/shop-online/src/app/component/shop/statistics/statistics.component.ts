import {Component, OnInit} from '@angular/core';
import {Statistics} from '../../../model/statistics';
import {ProductService} from '../../../service/product.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Chart, registerables} from 'chart.js';
// import 'chartjs-adapter-moment'; // or another adapter to avoid moment
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  // @ts-ignore
  private myChart: Chart;
  status: boolean = false;
  listValueTime: any;
  statistics: Statistics;
  listStatisticByMonth: any;
  listStatisticByYear: any;


  formChart = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
    type: new FormControl(''),
  });

  constructor(private orderService: ProductService) {

  }

  ngOnInit(): void {
  }

  onChangeStatistic(value: any) {
    switch (value) {
      case 'year':
        this.formChart.patchValue({});
        break;
      case 'month':
        this.formChart.patchValue({});
        break;
    }
  }

  onSubmit() {
    this.statistics = this.formChart.value;
    if (this.statistics.type === 'year') {
      // @ts-ignore
      this.orderService.getStatisticsYear().subscribe(value => {
        this.listStatisticByYear = value;
        console.log(value);
      });
      this.detroyChart();
      this.createChartYear();
    } else if (this.statistics.type === 'month') {
      // @ts-ignore
      this.orderService.getStatisticsMonth().subscribe(value => {
        this.listStatisticByMonth = value;
        console.log(value);
      });
      this.detroyChart();
      this.createChartMonth();
    } else {
      this.orderService.getProduct(this.statistics.start, this.statistics.end).subscribe(value => {
        this.listValueTime = value;
        console.log(this.listValueTime);
      });
      this.detroyChart();
      this.createChart();
    }

  }

  detroyChart() {
    if (this.myChart != null) {
      this.myChart.destroy();
    }
  }

  createChart() {
    // @ts-ignore
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Số lượng',
          data: this.listValueTime,
          parsing: {
            xAxisKey: 'name',
            yAxisKey: 'quantity'
          },
          backgroundColor: [
            '#FFD333'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Số lượng',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 20, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Tên sản phẩm',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 0, bottom: 10}
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'THỐNG KÊ THEO MÁY',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'roboto',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            },
            padding: {top: 20, bottom: 0},
          },
        }
      }
    });
  }

  createChartYear() {
    // @ts-ignore
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Số lượng',
          data: this.listStatisticByYear,
          parsing: {
            xAxisKey: 'name',
            yAxisKey: 'quantity'
          },
          backgroundColor: [
            '#FFD333'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Số lượng',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 20, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Tên sản phẩm',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 0, bottom: 10}
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'THỐNG KÊ THEO NĂM',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'roboto',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            },
            padding: {top: 20, bottom: 0},
          },
        }
      }
    });
  }

  createChartMonth() {
    // @ts-ignore
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Số lượng',
          data: this.listStatisticByMonth,
          parsing: {
            xAxisKey: 'name',
            yAxisKey: 'quantity'
          },
          backgroundColor: [
            '#FFD333'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Số lượng',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 20, bottom: 0}
            }
          },
          x: {
            beginAtZero: true,
            display: true,
            title: {
              display: true,
              text: 'Tên sản phẩm',
              color: '#3EB595',
              font: {
                family: 'roboto',
                size: 15,
                style: 'normal',
                lineHeight: 1.0
              },
              padding: {top: 0, bottom: 10}
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'THỐNG KÊ THEO NĂM',
            position: 'top',
            color: '#3EB595',
            font: {
              family: 'roboto',
              size: 30,
              style: 'normal',
              lineHeight: 1.0
            },
            padding: {top: 20, bottom: 0},
          },
        }
      }
    });
  }
}


