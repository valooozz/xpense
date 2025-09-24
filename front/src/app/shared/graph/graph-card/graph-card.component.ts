import { Component, ContentChild, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatsService } from '../../../core/services/stats.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { AmountByGrouping } from '../../../models/amount-by-grouping';
import { ChartWithData } from '../../../models/chart-with-data';
import { assignNullCategory } from '../../../utils/assignNullCategory';
import { exportCsv } from '../../../utils/exportCsv';
import { ButtonComponent } from '../../button/button.component';


@Component({
  selector: 'app-graph-card',
  imports: [ButtonComponent],
  templateUrl: './graph-card.component.html',
  styles: ``
})
export class GraphCardComponent {
  @Input() grouping!: string;
  @Input() limit!: number;
  @Input() title!: string;

  @ContentChild('data', { descendants: true }) graph!: ChartWithData;

  errorMessage!: string;

  constructor(private transactionService: TransactionService, private statsService: StatsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadData();
    this.transactionService.getTransactionsChanged().subscribe(() => {
      this.loadData();
    });
  }

  private updateGraphData(data: AmountByGrouping[]) {
    this.graph.data = data;
  }

  private loadData() {
    this.statsService.getAmountByGrouping(this.grouping, this.limit)
      .subscribe({
        next: async (res) => {
          const formattedData = assignNullCategory(res);
          this.updateGraphData(formattedData);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || "Impossible de récupérer les transactions.";
        }
      });
  }

  onExport() {
    if (!this.graph || !this.graph.data || !Array.isArray(this.graph.data) || this.graph.data.length === 0) {
      this.toastr.error("Aucune donnée à exporter");
      return;
    }

    const keys = Object.keys(this.graph.data[0]);
    const csvRows = [
      keys.join(','), // header
      ...this.graph.data.map(row =>
        keys.map(k => {
          const val = (row as unknown as Record<string, unknown>)[k];
          if (typeof val === 'string') {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(',')
      )
    ];

    exportCsv(csvRows, `${this.title.replaceAll(' ', '') || 'export'}.csv`);
  }
}
