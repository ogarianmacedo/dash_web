import {Routes} from '@angular/router';

/**
 * Adicionados
 */
import {UsuariosComponent} from "../../modules/usuarios/usuarios.component";
import {UsuarioFormEditarComponent} from "../../modules/usuarios/usuario-form-editar/usuario-form-editar.component";
import {UsuarioDetalheComponent} from "../../modules/usuarios/usuario-detalhe/usuario-detalhe.component";
import {UsuarioFormComponent} from "../../modules/usuarios/usuario-form/usuario-form.component";

export const AdminLayoutRoutes: Routes = [
    /**
     * Seguir padrão de ordem das rotas
     */
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'usuarios/novo', component: UsuarioFormComponent},
    {path: 'usuarios/detalhes/:id', component: UsuarioDetalheComponent},
    {path: 'usuarios/editar/:id', component: UsuarioFormEditarComponent},
];
