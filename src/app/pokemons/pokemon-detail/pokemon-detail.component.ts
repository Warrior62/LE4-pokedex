import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pk-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  pokemon?: Pokemon;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonDetail(id).subscribe(pokemon => this.pokemon = pokemon);
  }

  playPokemonSound(id: number){
    new Audio(`../../../assets/audio/${id}.mp3`).play()
  }
}
