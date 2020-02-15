import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/services/usuarios.service';

//adicionado p/ metodo de notificacao
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private service: UsuariosService) { }

  ngOnInit() {
    this.buscaUsuarios();
  }

  buscaUsuarios() {
    this.service.buscaUsuarios()
      .subscribe(res => {
        this.usuarios = res['usuarios'];
      });
  }

  alterarStatus(id) {
    this.service.alterarStatusUsuario(id)
      .subscribe(res => {
        var message = "Status do usuário alterado com sucesso!";
        var icon = "pe-7s-smile";
        this.showNotificacao('top', 'center', 'success', message, icon);

        this.buscaUsuarios();
      });
  }

  /**
     * Mostra alerta com mensagem
     */
  showNotificacao(from, align, type, message, icon) {
    $.notify({
      icon: icon,
      message: message
    }, {
      type: type,
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }
}
