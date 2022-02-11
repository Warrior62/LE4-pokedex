import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    InfiniteScrollModule
  ]
})
export class PokemonsModule { }
