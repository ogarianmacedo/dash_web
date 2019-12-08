import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/services/usuarios.service';
import { Router } from '@angular/router';

//adicionado p/ metodo de notificacao
declare var $: any;

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  usuario: any[] = [];
  perfis: any[] = [];

  constructor(private service: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.listaPerfis();
  }

  listaPerfis() {
    this.service.listaPerfis()
      .subscribe((data: any[]) => {
        this.perfis = data['perfis'];
      })
  }

  novoUsuario(form) {
    if (form.value) {
      if (form.value.senha != form.value.confimarSenha) {
        var message = "As senhas não conferem!";
        var icon = "pe-7s-attention";
        this.showNotificacao('top', 'center', 'warning', message, icon);
      }

      this.service.cadastrarUsuario(form.value).subscribe(res => {
        console.log(res);
        var message = "Usuário salvo com sucesso!";
        var icon = "pe-7s-smile";
        this.showNotificacao('top', 'center', 'success', message, icon);
        this.router.navigate(['usuarios']);
      }, (err) => {
        console.log(err);
        var message = "Erro ao cadastrar usuário, tente mais tarde!";
        var icon = "pe-7s-attention";
        this.showNotificacao('top', 'center', 'warning', message, icon);
      });
    }
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
