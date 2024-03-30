import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionario';
import { HttpClient } from '@angular/common/http';
import { RespuestaCuestionario } from '../models/respuestaCuestionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {
  nombreParticipante:string='';
  idCuestionario!:number;
  respuestas:number[]=[];
  cuestionario!:Cuestionario;
  private baseUrl='http://localhost:5049/api';

  constructor(private Http:HttpClient) {

  }
  guardarRespuestaCuestionario(respuestaCuestionario:RespuestaCuestionario):Observable<any>{
    return this.Http.post(`${this.baseUrl}/RespuestaCuestionario`,respuestaCuestionario);
  }

  getListCuestionarioRespuesta(idCuestionario:number):Observable<any>{
    return this.Http.get(`${this.baseUrl}/RespuestaCuestionario/${idCuestionario}`);
  }
  eliminarRespuestaCuestionario(idRespuestaCuestionario:number):Observable<any>{
    return this.Http.delete(`${this.baseUrl}/RespuestaCuestionario/${idRespuestaCuestionario}`);
  }
  getCuestionarioByIdRespuesta(idRespuesta:number):Observable<any>{
    return this.Http.get(`${this.baseUrl}/RespuestaCuestionario/GetCuestionarioByIdRespuesta/${idRespuesta}`);
  }
}
