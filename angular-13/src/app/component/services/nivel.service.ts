import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Nivel } from '../interfaces/nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getNivel(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.baseUrl}/niveles`)
  }
}
