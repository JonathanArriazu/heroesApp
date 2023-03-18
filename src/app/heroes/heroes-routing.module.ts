import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';

const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'listado', component: ListadoComponent }, ///localhost:4200/heroes/listado
      { path: 'agregar', component: AgregarComponent }, ///localhost:4200/heroes/agregar
      { path: 'editar/:id', component: AgregarComponent }, ///localhost:4200/heroes/editar/id
      { path: 'buscar', component: BuscarComponent }, ///localhost:4200/heroes/buscar
      { path: ':id', component: HeroeComponent }, ///localhost:4200/heroes/id
      { path: '**', redirectTo: 'listado' }
    ]
  }
];



@NgModule({
  imports: [
    RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
