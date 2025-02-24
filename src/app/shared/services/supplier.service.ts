import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = `${environment.apiUrl}/suppliers`;

  constructor(private http: HttpClient) {}

  getSuppliers(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', limit.toString())
      .set('ordering', 'id');
    
    return this.http.get<any>(this.baseUrl, { params });
  }

  getSupplierById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createSupplier(supplier: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, supplier);
  }

  updateSupplier(id: number, supplier: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, supplier);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchSuppliers(query: string): Observable<any[]> {
    const params = new HttpParams().set('name', query);
    return this.http.get<any[]>(this.baseUrl, { params });
  }
}
