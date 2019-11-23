import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AutenticarService } from 'app/autenticar/services/autenticar.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Proteção das rotas
 */
export class AutenticarGuard implements CanActivate, CanActivateChild {

  constructor(private autenticarService: AutenticarService, private router: Router) { }

  //Protege as rotas principais
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.autenticarService.verificaUsuarioLogado()) {
      return true;
    }

    this.router.navigate(['autenticar/login']);
    return false;
  }

  //Protege rotas filhas
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.autenticarService.verificaUsuarioLogado()) {
      return true;
    }

    this.router.navigate(['autenticar/login']);
    return false;
  }
}