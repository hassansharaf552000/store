import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceResponse, Invoice } from '../models/invoice.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  private apiUrl = `${environment.apiUrl}/purchase-invoices`;

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(this.apiUrl);
  }

  getInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }
}
