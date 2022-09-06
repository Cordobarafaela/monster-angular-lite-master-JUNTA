import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Titulo } from '../interfaces/titulo';

@Injectable({
  providedIn: 'root'
})
export class TituloService {


  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getTitulo(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.baseUrl}/titulos`)
  }
  getTituloporId(id: number): Observable<Titulo> {
    return this.http.get<Titulo>(`${this.baseUrl}/titulos/${id}`);
  }

  agregarTitulo(titulo: Titulo): Observable<Titulo> {
    return this.http.post<Titulo>(`${this.baseUrl}/titulos`, titulo);
  }
  actualizarTitulo(titulo: Titulo): Observable<Titulo> {
    return this.http.put<Titulo>(`${this.baseUrl}/titulos/${titulo.id}`, titulo);
  }
  borrarTitulo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/titulos/${id}`);
  }
}