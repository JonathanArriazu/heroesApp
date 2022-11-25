import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor ( private authService: AuthService,
                private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

      return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if(!estaAutenticado) {
                    this.router.navigate(['/auth/login']);
                  }
                } )
              )
    
      /* if( this.authService.auth.id ) {
        return true
      }
      return true */
      
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado => {
                  if(!estaAutenticado) {
                    this.router.navigate(['/auth/login']);
                  }
                } )
              )
      /* if( this.authService.auth.id ) {
        return true
      }
      return true
     */
    }  
}
