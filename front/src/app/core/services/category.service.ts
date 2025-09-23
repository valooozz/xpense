import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { ApiService } from './api.service';

@Injectable({ 
    providedIn: 'root' 
})
export class CategoryService {
  constructor(private api: ApiService) {}

  getCategories(): Observable<Category[]> {
    return this.api.get<Category[]>('category');
  }
  
}
