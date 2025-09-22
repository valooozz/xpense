import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AmountByGrouping } from '../../../models/amount-by-grouping';
import { ChartWithData } from '../../../models/chart-with-data';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './graph.component.html',
})
export class GraphComponent implements ChartWithData {
  @Input() data: AmountByGrouping[] = [];
  @Input() graphType!: ChartType;

  animate: boolean = true;

  public getGraphOptions(graphType: ChartType): ChartConfiguration['options'] {
    if (graphType === 'pie') {
      return {
        responsive: true,
        animation: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };
    } else if (graphType === 'bar') {
      return {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    }
    return {
      responsive: true,
      animation: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };
  };

  private formatLabel(rawLabel: string, graphType: ChartType): string {
    if (graphType === 'bar') {
      let date = new Date();
      date.setMonth(parseInt(rawLabel) - 1);
      return date.toLocaleString('fr-FR', { month: 'long' });
    }

    return rawLabel
  }

  get graphData(): ChartData<ChartType, number[], string | string[]> {
    return {
      labels: this.data.map(item => this.formatLabel(item.grouping, this.graphType)),
      datasets: [
        {
          data: this.data.map(item => item.amount),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    };
  }
}
