import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'pokedex', pathMatch: 'full'},
  {path: 'pokemons', component: PokemonListComponent},
  {path: 'pokemons/:id', component: PokemonDetailComponent},
  {path: 'pokedex', component: PokedexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
