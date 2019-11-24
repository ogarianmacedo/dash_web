import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/services/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  usuario: any[] = [];

  constructor(private service: UsuariosService) { }

  ngOnInit() {
  }

  novoUsuario(form) {
    console.log(form.value);
  }

}
