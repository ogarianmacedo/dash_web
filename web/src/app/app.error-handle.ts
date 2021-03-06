import {Injectable, ErrorHandler, Injector} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class AplicacaoErrorHandle extends ErrorHandler {

    constructor(private injector: Injector) {
        super();
    }

    /**
     * Tratamento de erros de retorno do backend
     * @param errorResponse
     */
    handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse) {
            const error = (typeof errorResponse.error !== 'object') ? JSON.parse(errorResponse.error) : errorResponse.error;

            if (error.error == 'token_expired') {
                this.redirecionaLogin();
            }

            if (errorResponse.status == 400 && (error.error == 'token_expired' || error.error == 'token_invalid' || error.error == 'A token is required' || error.error == 'token_not_provided')) {
                this.redirecionaLogin();
            }

            if (errorResponse.status == 401 && error.error == 'token_has_been_blacklisted') {
                this.redirecionaLogin();
            }
        }

        super.handleError(errorResponse);
    }

    /**
     * Redireciona o sistema para a tela de login
     */
    redirecionaLogin(): void {
        window.location.reload();
        const router = this.injector.get(Router);
        localStorage.clear();
        router.navigate(['autenticar/login']);
    }
}