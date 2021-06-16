import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NguiMapModule} from '@ngui/map';
import {AdminLayoutRoutes} from './admin-layout.routing';

/**
 * Adicionados
 */
import {UsuariosComponent} from "../../modules/usuarios/usuarios.component";
import {UsuarioFormEditarComponent} from "../../modules/usuarios/usuario-form-editar/usuario-form-editar.component";
import {UsuarioDetalheComponent} from "../../modules/usuarios/usuario-detalhe/usuario-detalhe.component";
import {UsuarioFormComponent} from "../../modules/usuarios/usuario-form/usuario-form.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
    ],
    declarations: [
        UsuariosComponent,
        UsuarioFormComponent,
        UsuarioDetalheComponent,
        UsuarioFormEditarComponent
    ]
})

export class AdminLayoutModule {
}
