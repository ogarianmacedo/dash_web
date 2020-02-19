import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

/**
 * Adicionados
 */
import { AutenticarModule } from './autenticar/autenticar.module';
import { AutenticarGuard } from './proteger/autenticar.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { AplicacaoErrorHandle } from './app.error-handle';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";

/**
 * Configuração do Loader
 */
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: '#00ACC1',
    fgsColor: '#d6686e',
    bgsOpacity: 0.1
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    AutenticarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [
    AutenticarGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AplicacaoErrorHandle }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
