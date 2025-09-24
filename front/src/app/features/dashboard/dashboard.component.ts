import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/button/button.component';
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
    GraphCardComponent,
    ButtonComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: ''
})
export class DashboardComponent {

  constructor(private auth: AuthService, private router: Router, private toastr: ToastrService) {}

  onLogout() {
    this.auth.logout()
        .subscribe(() => {
          this.toastr.success('Déconnexion réussie');
          this.router.navigate(['/login']);
        })
  }
}
