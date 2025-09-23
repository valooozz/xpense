import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class DashboardComponent {
}
