import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import {NgxUiLoaderService} from "ngx-ui-loader";

//adicionado p/ metodo de notificacao
declare var $: any;

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.scss']
})
export class UsuarioDetalheComponent implements OnInit {

  usuario: any[] = [];
  url = environment.api_url;

  constructor(private service: UsuariosService, private route: ActivatedRoute, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {
    this.buscaUsuarioSelecionado();
  }

  buscaUsuarioSelecionado() {
      var id = this.route.snapshot.params['id'];

      this.service.buscaUsuarioSelecionado(id)
      .subscribe(res =>
      {
        this.ngxLoader.stop();
        this.usuario = res['retorno'];
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

        this.buscaUsuarioSelecionado();
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
