import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from 'app/interfaces/usuario';
import { catchError, tap, map } from 'rxjs/operators';

// para usar em http.post
const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json'}
   )
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlApi = environment.api_url + '/usuarios/';

  constructor(private http: HttpClient) { }

  /**
   * Busca usuarios cadastrados
   */
  buscaUsuarios (): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlApi + 'busca-usuarios');
  }

  listaPerfis () {
    return this.http.get(environment.api_url + '/perfil/busca-perfis');
  }

  cadastrarUsuario (dados): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(this.urlApi + 'novo', dados, httpOptions);
  }

  upload(arquivo) {
    const formData = new FormData();
    formData.append('imagem', arquivo[0]);
    return this.http.post(this.urlApi + 'upload', formData);
  }

}
