import {Component, OnInit} from '@angular/core';
import {UsuariosService} from 'app/services/usuarios.service';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from "ngx-ui-loader";

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
    arquivo: Set<File>;
    nomeImagem: string = "";

    constructor(
        private service: UsuariosService,
        private router: Router,
        private ngxLoader: NgxUiLoaderService
    ) {
    }

    ngOnInit() {
        this.listaPerfis();
    }

    listaPerfis() {
        this.service.listaPerfis()
            .subscribe((data: any[]) => {
                this.perfis = data['perfis'];
            })
    }

    carregaArquivo(event: any) {
        this.arquivo = event.target.files;
    }

    novoUsuario(form) {
        this.ngxLoader.start();

        if (form.value) {
            if (form.value.senha != form.value.confimarSenha) {
                this.ngxLoader.stop();
                var message = "As senhas não conferem!";
                var icon = "pe-7s-attention";
                this.showNotificacao('top', 'center', 'warning', message, icon);
                return false;
            }

            if (!this.arquivo) {
                this.ngxLoader.stop();
                var message = "Selecione uma imagem!";
                var icon = "pe-7s-attention";
                this.showNotificacao('top', 'center', 'warning', message, icon);
                return false;
            }

            this.service.upload(this.arquivo).subscribe(resImg => {
                form.value.imagem = resImg['retorno'];

                this.service.cadastrarUsuario(form.value).subscribe(res => {
                    this.ngxLoader.stop();
                    var message = "Usuário salvo com sucesso!";
                    var icon = "pe-7s-smile";
                    this.showNotificacao('top', 'center', 'success', message, icon);
                    this.router.navigate(['usuarios']);
                }, (err) => {
                    this.ngxLoader.stop();
                    var message = "Erro ao cadastrar usuário, tente mais tarde!";
                    var icon = "pe-7s-attention";
                    this.showNotificacao('top', 'center', 'warning', message, icon);
                })
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
