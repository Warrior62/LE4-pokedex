import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../model/pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'pk-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon?: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonDetail(id).subscribe(pokemon => this.pokemon = pokemon);
  }

  playPokemonSound(id: number){
    new Audio(`../../../assets/audio/${id}.mp3`).play()
  }
}
