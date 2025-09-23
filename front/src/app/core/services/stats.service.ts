import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmountByGrouping } from '../../models/amount-by-grouping';
import { ApiService } from './api.service';

@Injectable({ 
    providedIn: 'root' 
})
export class StatsService {

  constructor(private api: ApiService) {}

  getAmountByGrouping(grouping: string, userId: string, limit: number): Observable<AmountByGrouping[]> {
    let url = `stats/${grouping}/${userId}`;
    if (limit) {
        url += `?limit=${limit}`
    }
    return this.api.get<AmountByGrouping[]>(url);
  }

}
