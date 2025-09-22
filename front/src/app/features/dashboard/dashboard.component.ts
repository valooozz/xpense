import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Transaction } from '../../models/transaction';
import { GraphCardComponent } from "../../shared/graph/graph-card/graph-card.component";
import { GraphComponent } from '../../shared/graph/graph/graph.component';
import { TransactionManagerComponent } from '../transaction/transaction-manager/transaction-manager.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GraphComponent,
    TransactionManagerComponent,
    GraphCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: ''
})
export class DashboardComponent implements OnInit {
  userId!: string;
  transactions: Transaction[] = [];
  errorMessage!: string;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId')!;

    this.api.get<Transaction[]>(`transaction/user/${this.userId}`)
      .subscribe({
        next: async (res) => {
          this.transactions = res
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || "Impossible de récupérer les transactions.";
        }
      });
  }
}
