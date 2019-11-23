import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/autenticar/interfaces/usuario';
import { AutenticarService } from 'app/autenticar/services/autenticar.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario: Usuario;

  constructor(private autenticarService: AutenticarService, private http: HttpClient) { }

  ngOnInit() {
    this.getDadosUsuarioLogado();
  }

  getDadosUsuarioLogado() {
    this.http.get<any>(environment.api_url + '/usuario/autenticado').subscribe(data => {
      this.usuario = data.usuario;
    });
  }

}
