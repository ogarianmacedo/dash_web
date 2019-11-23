import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/usuario';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AutenticarService {

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Metodo para login
   * @param dados 
   */
  login(dados: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(environment.api_url + '/autenticar/login', dados)
      .do(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', btoa(JSON.stringify(data.usuario)));
      });
  }

  /**
   * Metodo para erificar se o usuario está logado
   */
  verificaUsuarioLogado(): boolean {
    return localStorage.getItem('usuario') ? true : false;
  }

  /**
   * Metodo para logout
   */
  logout(): void {
    this.http.get(environment.api_url + '/autenticar/logout').subscribe(resp => {
      localStorage.clear();
      this.router.navigate(['autenticar/login']);
    });
  }

  /**
   * Pega dados do usuario no storage
   */
  getUsuarioStorage(): Usuario {
    return localStorage.getItem('usuario') ? JSON.parse(atob(localStorage.getItem('usuario'))) : null;
  }

  /**
   *  Busca dados usuario na base
   */
  getUsuarioAutenticado(): Promise<boolean> {
    return this.http.get<any>(environment.api_url + '/autenticar/getUsuarioAutenticado').toPromise()
      .then(data => {
        if(data.usuario){
          localStorage.setItem('usuario', btoa(JSON.stringify(data.usuario)));
          return true;
        }

        return false;
      });
  }

}
