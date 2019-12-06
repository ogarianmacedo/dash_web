import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticarService } from 'app/services/autenticar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

//adicionado p/ metodo de notificacao
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private autenticarService: AutenticarService,
    private router: Router) {
  }

  ngOnInit() {
    //inicializa parametros do formulario de login
    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  /**
   * Metodo para fazer login
   */
  entrar() {
    this.autenticarService.login(this.formulario.value).subscribe(
      (response) => {
        this.router.navigate(['usuarios']);
      },
      (errorResponse: HttpErrorResponse) => {
        var message = "E-mail ou senha inválidos.";
        var icon = "pe-7s-attention"
        this.showNotificacao('top', 'center', 'warning', message, icon)
      }
    );
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
