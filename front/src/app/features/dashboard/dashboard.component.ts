import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { TransactionService } from '../../core/services/transaction.service';
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
  errorMessage!: string;

  constructor(private route: ActivatedRoute, private api: ApiService, private transactionService: TransactionService) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
  }
}
