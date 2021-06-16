import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';

//Adicionados
import {LoginComponent} from './autenticar/login.component';
import {AutenticarGuard} from './proteger/autenticar.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AutenticarGuard],
        canActivateChild: [AutenticarGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: '',
                loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
            }
        ]
    },
    {
        path: 'autenticar/login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
