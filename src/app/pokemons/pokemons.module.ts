import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokedexComponent } from './pokedex/pokedex.component';


@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent
  ],
  imports: [
    CommonModule,
    PokemonsRoutingModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule,
    InfiniteScrollModule
  ]
})
export class PokemonsModule { }
