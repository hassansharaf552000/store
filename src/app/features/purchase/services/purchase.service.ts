import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrder, PurchaseResponse, CreatePurchaseOrderRequest } from '../models/purchase-order.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = `${environment.apiUrl}/purchases`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<PurchaseResponse> {
    return this.http.get<PurchaseResponse>(this.apiUrl);
  }

  getOrder(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: CreatePurchaseOrderRequest): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.apiUrl, order);
  }

  updateOrderStatus(id: number, status: string): Observable<PurchaseOrder> {
    const updateData = {
      status: status
    };
    return this.http.patch<PurchaseOrder>(`${this.apiUrl}/${id}`, updateData);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
