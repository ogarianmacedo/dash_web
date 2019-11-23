import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from 'app/interfaces/usuario';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  /**
   * Busca usuarios cadastrados
   */
  buscaUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(environment.api_url + '/usuarios/busca-usuarios');
  }

}
