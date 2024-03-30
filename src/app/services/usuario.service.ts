import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl='http://localhost:5049/api';
  constructor(private Http:HttpClient) { }

  saveUser(usuario:Usuario):Observable<any>{
    return this.Http.post(`${this.baseUrl}/usuario`,usuario);
  }
  changePassword(changePassword:any):Observable<any>{
    return this.Http.put(`${this.baseUrl}/usuario/cambiarpassword`,changePassword);
  }
}
