import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private apiUrl = 'http://localhost:3000/api/data'; // Cambia esto según tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener datos
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para agregar datos
  addData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar datos
  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar datos
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

