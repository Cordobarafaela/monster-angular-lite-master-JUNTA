import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getEspecialidad(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.baseUrl}/especialidades`)
  }

  getEspecialidadporId(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.baseUrl}/especialidades/${id}`);
  }


/*   getSugerencias(termino: string): Observable<Competencia[]> {
    return this.http.get<Competencia[]>(`${this.baseUrl}/competencias?q=${termino}&_limit=6`)
  } */

  agregarEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(`${this.baseUrl}/especialidades`, especialidad);
  }
  actualizarEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.baseUrl}/especialidades/${especialidad.id}`, especialidad);
  } 
  
  borrarEspecialidad(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/especialidades/${id}`);
  }
}
