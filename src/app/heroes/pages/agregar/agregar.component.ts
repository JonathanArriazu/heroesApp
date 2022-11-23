import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [ `
    img {
      width: 100%,
      border-radius: 5px
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics', //Este id lo coloco segun como esta en la base de datos, en donde hay dos opciones: Dc o Marvel Comics
      desc: 'Dc - Comics'
    },    
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = { //Tenemos que definir todas las propiedades que tiene el heroe (las cuales las definimos en la interface)
    //id?: '' --> id es opcional, entonces no lo colocamos
    superhero: '',
    publisher: Publisher.DCComics, //publisher tiene su otra propia interface
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  }

  constructor( private heroeService: HeroesService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroeService.getHeroePorId( id ) ) //Este observable retorna un heroe
    )
    .subscribe (heroe => this.heroe = heroe) //el heroe que tengo arriba (definido con todas las propiedades en blanco va a ser igual al heroe que estoy recibiendo)
  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //Actualizar
      this.heroeService.actualizarHeroe( this.heroe )
        .subscribe( heroe => this.mostrarSnackbar('Registro actualizado') )
    } else {
      //Crear
      this.heroeService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackbar('Registro creado')
      })
    }    
  }

  borrarHeroe() {


    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if ( result ) {
          this.heroeService.borrarHeroe( this.heroe.id! )
            .subscribe( resp => {
          this.router.navigate(['/heroes']);
          })
        }
      }
    )

    /* this.heroeService.borrarHeroe( this.heroe.id! )
      .subscribe( resp => {

        this.router.navigate(['/heroes']);

       */
  }

  mostrarSnackbar( mensaje: string ) {
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }
}
