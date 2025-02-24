import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl = `${environment.apiUrl}/units`;

  constructor(private http: HttpClient) {}

  getUnits(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', limit.toString())
      .set('ordering', 'id');
    
    return this.http.get<any>(this.baseUrl, { params });
  }

  getUnitById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createUnit(unit: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, unit);
  }

  updateUnit(id: number, unit: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, unit);
  }

  deleteUnit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchUnits(query: string): Observable<any[]> {
    const params = new HttpParams().set('name', query);
    return this.http.get<any[]>(this.baseUrl, { params });
  }
}
