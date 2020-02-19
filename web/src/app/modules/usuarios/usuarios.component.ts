import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/services/usuarios.service';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

//adicionado p/ metodo de notificacao
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];

  constructor(private router: Router, private service: UsuariosService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.buscaUsuarios();
  }

  buscaUsuarios() {
    this.ngxLoader.start();
    this.service.buscaUsuarios()
      .subscribe(res =>
      {
        this.ngxLoader.stop();
        this.usuarios = res['usuarios'];
      });
  }

  alterarStatus(id) {
    this.ngxLoader.start();
    this.service.alterarStatusUsuario(id)
      .subscribe(res =>
      {
        this.ngxLoader.stop();
        var message = "Status do usuário alterado com sucesso!";
        var icon = "pe-7s-smile";
        this.showNotificacao('top', 'center', 'success', message, icon);

        this.buscaUsuarios();
      });
  }

  visualizarUsuario(id) {
      this.ngxLoader.start();

      setTimeout(() => {
          this.router.navigate(['/usuarios/detalhes/', id]);
      }, 1000);
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
