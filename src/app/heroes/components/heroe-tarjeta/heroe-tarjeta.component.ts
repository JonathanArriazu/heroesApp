import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../pages/heroe/interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html'
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() heroe!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
