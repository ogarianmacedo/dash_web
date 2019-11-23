import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/services/usuarios.service';
import { Usuario } from 'app/interfaces/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: any;

  constructor(private service: UsuariosService) { }

  ngOnInit() {
    this.buscaUsuarios();
  }

  buscaUsuarios() {
    this.service.buscaUsuarios()
    .subscribe(res => {
      this.usuarios = res['usuarios'];
    }, err => {
      console.log(err);
    });
  }

}
