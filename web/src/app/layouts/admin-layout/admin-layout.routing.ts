import { Routes } from '@angular/router';

import { UsuariosComponent } from 'app/usuarios/usuarios.component';
import { UsuarioFormComponent } from 'app/usuarios/usuario-form/usuario-form.component';
import { UsuarioDetalheComponent } from 'app/usuarios/usuario-detalhe/usuario-detalhe.component';

export const AdminLayoutRoutes: Routes = [

    /**
     * Seguir padrão de ordem das rotas
     */
    { path: 'usuarios',              component: UsuariosComponent },
    { path: 'usuarios/novo',         component: UsuarioFormComponent },
    { path: 'usuarios/:id',          component: UsuarioDetalheComponent },
    { path: 'usuarios/:id/editar',   component: UsuarioFormComponent },
];
