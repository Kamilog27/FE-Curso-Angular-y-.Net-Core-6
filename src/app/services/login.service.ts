import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:5049/api';
  constructor(private Http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {

    return this.Http.post(`${this.baseUrl}/login`, usuario);
  }
  setLocalStorage(data: any): void {
    localStorage.setItem("token", data);
  }
  // getNombreUsuario():string|null{
  //   return localStorage.getItem("nombreUsuario");
  // }
  getTokenDecoded(): any {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("token")!);
    return decodedToken;
  }
  removeLocalStorage() {
    localStorage.removeItem("token");

  }
  getToken():string{
    return localStorage.getItem("token")!;
  }
}
