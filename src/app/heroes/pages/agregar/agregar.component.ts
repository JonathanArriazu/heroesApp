import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

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
                private router: Router ) { }

  ngOnInit(): void {

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
        .subscribe( heroe => console.log("Actualizando", heroe) )
    } else {
      //Crear
      this.heroeService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
      })
    }    
  }
}
