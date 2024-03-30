import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  tituloCuestionario:string='';
  descripcionCuestionario:string='';
  private baseUrl = 'http://localhost:5049/api';
  constructor(private Http:HttpClient) { }

  guardarCuestionario(cuestionario:Cuestionario):Observable<any>{
    
    return this.Http.post(`${this.baseUrl}/cuestionario`,cuestionario);
  }
  getListCuestionarioByUser():Observable<any>{
    return this.Http.get(`${this.baseUrl}/cuestionario/GetListCuestionarioByUser`);
  }
  deleteCuestionario(idCuestionario:number):Observable<any>{
    return this.Http.delete(`${this.baseUrl}/cuestionario/${idCuestionario}`);
  }
  getCuestionario(idCuestionario:number):Observable<any>{
    return this.Http.get(`${this.baseUrl}/cuestionario/${idCuestionario}`);

  }
  getListCuestinarios():Observable<any>{
    return this.Http.get(`${this.baseUrl}/cuestionario/GetListCuestionarios`);
  }
}
