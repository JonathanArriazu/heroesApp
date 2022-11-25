import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,
               private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    //Ir al backend
    //Un usuario
    this.authService.login()
      .subscribe( resp => {
        console.log(resp);
        
        //navegar a la pantalla de heroes
        if ( resp.id ) {
          this.router.navigate(['./heroes']);
        }
      } )
    
  }

}
