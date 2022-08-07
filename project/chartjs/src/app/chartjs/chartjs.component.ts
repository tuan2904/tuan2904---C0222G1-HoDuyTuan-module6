import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IchartjsService} from '../ichartjs.service';
import {Chart, registerables} from 'chart.js';
import {Ichart} from '../ichart';
Chart.register(...registerables);

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.css']
})
export class ChartjsComponent implements OnInit {
  chartInterface: Ichart;
  listValueTime: any;
  private myChart: Chart;
  error = true;

  constructor(private chartService: IchartjsService) {
  }

  formChart = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.chartInterface = this.formChart.value;
    this.chartService.getComputer(this.chartInterface.startDate, this.chartInterface.endDate).subscribe(value => {
        this.listValueTime = value;
        console.log(this.listValueTime);
        this.error = false;
      }
    );
    this.detroyChart();
    this.createChartTimeComputer();
  }

  createChartTimeComputer() {
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Giờ',
          data: this.listValueTime,
          parsing: {
            xAxisKey: 'computer',
            yAxisKey: 'time'
          },
          backgroundColor: [
            '#FF6633'
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
              text: 'Giờ',
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
              text: 'Mã máy',
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

  detroyChart() {
    if (this.myChart != null) {
      this.myChart.destroy();
    }
  }

}
