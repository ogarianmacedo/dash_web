import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { UsuariosComponent } from 'app/usuarios/usuarios.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'usuario',        component: UserComponent },
    { path: 'usuarios',       component: UsuariosComponent },
];
