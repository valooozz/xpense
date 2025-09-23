import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AmountByGrouping } from '../../../models/amount-by-grouping';
import { ChartWithData } from '../../../models/chart-with-data';
import { formatGraphValue } from '../../../utils/formatGraphValue';
import { isSmallCategory } from '../../../utils/isSmallCategory';

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

  public getGraphOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      animation: false,
      maintainAspectRatio: this.graphType === 'pie',
      plugins: {
        legend: {
          position: 'bottom',
          display: this.graphType === 'pie'
        },
        datalabels: {
          formatter: (value: number) => formatGraphValue(value),
          display: (context) => {
            if (this.graphType !== 'pie') return true;
            return !isSmallCategory(context);
          }
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

  private extractData(): number[] {
    const dataExtracted = this.data.map(item => item.amount);
    if (this.graphType === 'bar') {
      return dataExtracted.reverse();
    }
    return dataExtracted;
  }

  private extractLabel(): string[] {
    const labelExtracted = this.data.map(item => this.formatLabel(item.grouping, this.graphType));
    if (this.graphType === 'bar') {
      return labelExtracted.reverse();
    }
    return labelExtracted;
  }

  get graphData(): ChartData<ChartType, number[], string | string[]> {
    return {
      labels: this.extractLabel(),
      datasets: [
        {
          data: this.extractData(),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#00A950',
            '#C9CBCF',
            '#FF4500',
            '#2E86AB'
          ],
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    };
  }
}
