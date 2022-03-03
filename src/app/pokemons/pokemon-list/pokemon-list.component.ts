import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PagedData } from '../model/paged-data.model';
import { Pokemon } from '../model/pokemon.model';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pk-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons?: PagedData<Pokemon>;
  infiniteScroll?: InfiniteScrollModule;
  pokemon?: Pokemon;
  @Output() displayDetailEvent = new EventEmitter<Pokemon>();
  offset?: number = 0;
  pattern?: string;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    //this.pokemonService.getPokemons().subscribe(pokemon => this.pokemons = pokemon);
    this.pokemonService.getPokemonsWithOffset(this.offset).subscribe(pokemon => this.pokemons = pokemon);
    //this.pokemonService.getPokemonsBySearch(this.pattern).subscribe(pokemon => this.pokemons = pokemon);
  }

  onScroll(e: InfiniteScrollModule){
    console.log('scrolled!!');
    this.infiniteScroll = e;

    if(this.pokemons && this.pokemons.offset < 152){

      this.pokemonService.getPokemonsWithOffset(this.pokemons?.offset + 20).subscribe(pokemon => {
        this.pokemons = {
          ...pokemon,
          data: this.pokemons?.data.concat(pokemon.data) ?? []
        };
      })
    }
  }

  displayDetails(pk?: Pokemon){
    this.displayDetailEvent.emit(pk)
  }

  onChangeEvent(e: any){
    console.log(e.target.value)
  }
}
