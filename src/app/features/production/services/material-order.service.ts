import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PurchaseOrder, PurchaseResponse } from '../../purchase/models/purchase-order.interface';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialOrderService {
  private apiUrl = `${environment.apiUrl}/purchases`;
 
  constructor(private http: HttpClient) {}

  getMaterialOrders(): Observable<PurchaseResponse> {
    // Get only approved orders by default
    const params = new HttpParams().set('status', 'approved');
    console.log('Sending request to:', this.apiUrl);
    return this.http.get<PurchaseResponse>(this.apiUrl, { params }).pipe(
      tap({
        next: (response) => console.log('Raw API Response:', response),
        error: (error) => console.error('API Error:', error)
      })
    );
  }

  getOrder(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.apiUrl}/${id}`);
  }

  markMaterialsDelivered(orderId: number, rawMaterialIds: number[]): Observable<any> {
    const payload = { raw_material_ids: rawMaterialIds };
    console.log(`Marking materials as delivered for order ${orderId}:`, payload);
    
    return this.http.post(`${this.apiUrl}/${orderId}/mark_delivered`, payload).pipe(
      tap({
        next: (response) => {
          console.log(`Success - Order ${orderId}:`, {
            payload,
            response
          });
        },
        error: (error) => {
          console.error(`Error - Order ${orderId}:`, {
            payload,
            error,
            errorMessage: error.error
          });
        }
      }),
      catchError(error => {
        if (error.error === "لم يتم العثور على مواد لم يتم تسليمها مع المعرفات المقدمة") {
          return throwError(() => ({
            type: 'ALREADY_DELIVERED',
            message: 'تم تسليم جميع المواد المحددة مسبقاً',
            orderId,
            materialIds: rawMaterialIds
          }));
        }
        return throwError(() => ({
          type: 'API_ERROR',
          originalError: error,
          orderId,
          materialIds: rawMaterialIds
        }));
      })
    );
  }
}
