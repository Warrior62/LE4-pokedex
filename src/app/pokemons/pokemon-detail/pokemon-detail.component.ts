import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'pk-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {

  @Input() pokemonToDisplay?: Pokemon;

  constructor(private pokemonService: PokemonService) { }

  ngOnChanges(): void {
    this.getPokemon();
  }

  getPokemon(){
    const id = this.pokemonToDisplay?.id
    if(id){
      this.pokemonService.getPokemonDetail(id).subscribe(pokemon => this.pokemonToDisplay = pokemon);
    }
  }

  playPokemonSound(id: number){
    new Audio(`../../../assets/audio/${id}.mp3`).play()
  }
}
