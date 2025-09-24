import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { TransactionService } from '../../core/services/transaction.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { GraphCardComponent } from "../../shared/graph/graph-card/graph-card.component";
import { GraphComponent } from '../../shared/graph/graph/graph.component';
import { exportCsv } from '../../utils/exportCsv';
import { TransactionManagerComponent } from '../transaction/transaction-manager/transaction-manager.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GraphComponent,
    TransactionManagerComponent,
    GraphCardComponent,
    ButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: ''
})
export class DashboardComponent {

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService, private transactionService: TransactionService) {}

  onLogout() {
    this.auth.logout()
        .subscribe(() => {
          this.toastr.success('Déconnexion réussie');
          this.router.navigate(['/login']);
        })
  }

  onExport() {
    this.transactionService.getTransactionsByUserForExport()
      .subscribe({
        next: (transactions) => {
          if (!transactions || transactions.length === 0) {
            this.toastr.warning('Aucune transaction à exporter.');
            return;
          }

          const header = Object.keys(transactions[0]);
          const csvRows = [
            header.join(','), // header row
            ...transactions.map(tx =>
              header.map(field => {
                let value = (tx as any)[field];
                if (typeof value === 'string') {
                  value = `"${value.replace(/"/g, '""')}"`;
                }
                return value;
              }).join(',')
            )
          ];

          exportCsv(csvRows, 'transactions.csv');
        },
        error: () => {
          this.toastr.error("Impossible d'exporter les transactions");
        }
      })
  }
}
