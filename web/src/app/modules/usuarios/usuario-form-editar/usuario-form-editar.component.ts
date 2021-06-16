import {Component, OnInit} from '@angular/core';
import {UsuariosService} from 'app/services/usuarios.service';
import {Router, ActivatedRoute} from '@angular/router';
import {environment} from 'environments/environment';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Usuario} from 'app/interfaces/usuario';

//adicionado p/ metodo de notificacao
declare var $: any;

@Component({
    selector: 'app-usuario-form-editar',
    templateUrl: './usuario-form-editar.component.html',
    styleUrls: ['./usuario-form-editar.component.scss']
})
export class UsuarioFormEditarComponent implements OnInit {

    usuario: Usuario;
    perfis: any[] = [];
    arquivo: Set<File>;
    nomeImagem: string = "";
    url = environment.api_url;

    constructor(
        private service: UsuariosService,
        private router: Router,
        private route: ActivatedRoute,
        private ngxLoader: NgxUiLoaderService
    ) {
    }

    ngOnInit() {
        this.buscaUsuarioSelecionado();
        this.listaPerfis();
    }

    buscaUsuarioSelecionado() {
        this.ngxLoader.start();
        var id = this.route.snapshot.params['id'];
        this.service.buscaUsuarioSelecionado(id)
            .subscribe(res => {
                this.ngxLoader.stop();
                this.usuario = res['retorno'];
            });
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

    editarUsuario(form) {
        this.ngxLoader.start();

        if (form.value) {
            if (form.value.senha != form.value.confimarSenha) {
                this.ngxLoader.stop();
                var message = "As senhas não conferem!";
                var icon = "pe-7s-attention";
                this.showNotificacao('top', 'center', 'warning', message, icon);
                return false;
            }

            var id = this.route.snapshot.params['id'];

            if (!this.arquivo) {
                this.service.editarUsuario(id, form.value).subscribe(res => {
                    this.ngxLoader.stop();
                    var message = "Usuário editado com sucesso!";
                    var icon = "pe-7s-smile";
                    this.showNotificacao('top', 'center', 'success', message, icon);
                    this.router.navigate(['usuarios']);
                }, (err) => {
                    this.ngxLoader.stop();
                    var message = "Erro ao editar usuário, tente mais tarde!";
                    var icon = "pe-7s-attention";
                    this.showNotificacao('top', 'center', 'warning', message, icon);
                })
            } else {
                this.service.upload(this.arquivo).subscribe(resImg => {
                    form.value.imagem = resImg['retorno'];

                    this.service.editarUsuario(id, form.value).subscribe(res => {
                        this.ngxLoader.stop();
                        var message = "Usuário editado com sucesso!";
                        var icon = "pe-7s-smile";
                        this.showNotificacao('top', 'center', 'success', message, icon);
                        this.router.navigate(['usuarios']);
                    }, (err) => {
                        this.ngxLoader.stop();
                        var message = "Erro ao editar usuário, tente mais tarde!";
                        var icon = "pe-7s-attention";
                        this.showNotificacao('top', 'center', 'warning', message, icon);
                    })
                });
            }
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
