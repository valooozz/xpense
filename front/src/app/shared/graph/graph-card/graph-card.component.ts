import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { StatsService } from '../../../core/services/stats.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { AmountByGrouping } from '../../../models/amount-by-grouping';
import { ChartWithData } from '../../../models/chart-with-data';
import { assignNullCategory } from '../../../utils/assignNullCategory';


@Component({
  selector: 'app-graph-card',
  imports: [],
  templateUrl: './graph-card.component.html',
  styles: ``
})
export class GraphCardComponent {
  @Input() grouping!: string;
  @Input() limit!: number;
  @Input() title!: string;

  @ContentChildren('data', { descendants: true }) graphs!: QueryList<ChartWithData>;

  errorMessage!: string;

  constructor(private api: ApiService, private transactionService: TransactionService, private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadData();
    this.transactionService.getTransactionsChanged().subscribe(() => {
      this.loadData();
    });
  }

  private updateGraphData(data: AmountByGrouping[]) {
    if (this.graphs && this.graphs.length > 0) {
      this.graphs.forEach(graph => {
        graph.data = data;
      });
    }
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
}
