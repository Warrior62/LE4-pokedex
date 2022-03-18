import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification.service';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pk-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemon?: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.idPksToList = this.authService.idList
  }

  getPokemon(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonDetail(id).subscribe(pokemon => this.pokemon = pokemon);
  }

  displayPokemonDetail(pk?: Pokemon){
    this.pokemon = pk;
    //alert(this.pokemon.name)
  }
}
