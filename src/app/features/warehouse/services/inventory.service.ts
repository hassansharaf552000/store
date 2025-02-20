import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RawMaterial } from '../models/raw-material.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'https://streetwear.mohamedsarhan.tech/ar/api/v1/raw-materials';

  constructor(private http: HttpClient) {}

  // Get all raw materials with optional pagination
  getAllMaterials(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', limit.toString())
      .set('ordering', 'id');  // Add ascending order by ID
    
    return this.http.get<any>(this.baseUrl, { params });
  }

  // Get single raw material by ID
  getMaterialById(id: number): Observable<RawMaterial> {
    return this.http.get<RawMaterial>(`${this.baseUrl}/${id}`);
  }

  // Create new raw material
  createMaterial(material: Partial<RawMaterial>): Observable<RawMaterial> {
    return this.http.post<RawMaterial>(this.baseUrl, material);
  }

  // Update existing raw material
  updateMaterial(id: number, material: Partial<RawMaterial>): Observable<RawMaterial> {
    return this.http.put<RawMaterial>(`${this.baseUrl}/${id}`, material);
  }

  // Delete raw material
  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Search raw materials
  searchMaterials(query: string): Observable<RawMaterial[]> {
    const params = new HttpParams().set('name', query);
    return this.http.get<RawMaterial[]>(this.baseUrl, { params });
  }
}
