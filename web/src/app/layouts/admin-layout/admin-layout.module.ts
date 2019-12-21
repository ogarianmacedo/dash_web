import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NguiMapModule} from '@ngui/map';
import { AdminLayoutRoutes } from './admin-layout.routing';

/**
 * Adicionados
 */
import { UsuariosComponent } from 'app/usuarios/usuarios.component';
import { UsuarioFormComponent } from 'app/usuarios/usuario-form/usuario-form.component';
import { UsuarioDetalheComponent } from 'app/usuarios/usuario-detalhe/usuario-detalhe.component';
import { UsuarioFormEditarComponent } from 'app/usuarios/usuario-form-editar/usuario-form-editar.component';

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

export class AdminLayoutModule {}
