import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AutenticarService} from 'app/services/autenticar.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from "ngx-ui-loader";

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
                private router: Router,
                private ngxLoader: NgxUiLoaderService) {
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
        this.ngxLoader.start();

        this.autenticarService.login(this.formulario.value).subscribe(
            (response) => {
                this.ngxLoader.stop();
                this.router.navigate(['usuarios']);
            },
            (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error.error == "usuario_inativo") {
                    this.ngxLoader.stop();
                    var message = "Usuário inativo.";
                    var icon = "pe-7s-attention";
                    this.showNotificacao('top', 'center', 'warning', message, icon);
                } else {
                    this.ngxLoader.stop();
                    var message = "E-mail ou senha inválidos.";
                    var icon = "pe-7s-attention";
                    this.showNotificacao('top', 'center', 'warning', message, icon);
                }
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
