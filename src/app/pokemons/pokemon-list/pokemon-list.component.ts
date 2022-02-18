import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PagedData } from '../model/paged-data.model';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pk-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons?: PagedData<Pokemon>;
  infiniteScroll?: InfiniteScrollModule;

  //@Output() open: EventEmitter<Pokemon> = new EventEmitter();
  pokemon?: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(pokemon => this.pokemons = pokemon);
  }

  onScroll(e: InfiniteScrollModule){
    console.log('scrolled!!');
    this.infiniteScroll = e;
  }

  displayPokemonDetail(pk: Pokemon){
    this.pokemon = pk;
  }
}
