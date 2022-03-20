import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AuthentificationService } from 'src/app/authentification.service';
import { TeamService } from 'src/app/team.service';
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
  pokemon?: Pokemon;
  @Output() displayDetailEvent = new EventEmitter<Pokemon>();
  offset?: number = 0;
  search?: string;

  constructor(private pokemonService: PokemonService, private authService: AuthentificationService, private teamService: TeamService) { }

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

  onChangeEvent(search: string){
    if(search.length > 0){
      this.search = search
      console.log(search)
      this.pokemonService.getPokemonsBySearch(this.search).subscribe(pokemon => this.pokemons = pokemon)
    }
    else {
      this.pokemonService.getPokemonsWithOffset(this.offset).subscribe(pokemon => this.pokemons = pokemon)
    }
  }

  addPkToTeam(pk: Pokemon){
    console.log("addPkToTeam ")
    if(this.teamService.teamIds.length < 6)
    {
      var elt = document.getElementById(pk.id.toString())
      if(elt){
        var defaultColor = elt.style.backgroundColor
        elt.style.backgroundColor = "green"
        elt.style.backgroundColor = defaultColor
      }
      this.teamService.addPokemonToTeam(pk.id || -1)
    }
    else {
      alert('Vous avez atteint la limite de 6 pokemons dans votre équipe !')
    }
  }
}
