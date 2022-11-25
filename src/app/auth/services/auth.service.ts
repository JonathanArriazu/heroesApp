import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl; //Es el url de nuestro endpoint que guardamos en environment
  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth} //Hacemos destructuring para asegurarnos de que se hace una copia y no se cambia el _auth original
  }

  constructor( private http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean>  { 

    if (!localStorage.getItem('id')) { //Si no tenemos id, entonces que no deje entrar.
      return of(false); //El of() sirve para poder transformar la respuesta del observable
    }
    //Ahora tenemos que verificar que esa id sea igual a la que tenemos en la base de datos
    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1`) //Como esto nos regresa un observable que tiene su Autenticacion, por eso lo pasamos por un pipe
              .pipe(
                map( auth => {   //El operador map sirve para transformar lo que sea que se reciba del observable y transformarlo. Y a su vez un mismo valor (es para transformar)
                  this._auth = auth;
                  return true //Si auth tiene valor, entonces regreso un true
                })
              );
  }

  login() {
    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/1`)
              .pipe(
                tap( auth => this._auth = auth ),
                tap( auth => localStorage.setItem('id', auth.id))
              );
  }

  logout() {
      this._auth = undefined;
  }
}
