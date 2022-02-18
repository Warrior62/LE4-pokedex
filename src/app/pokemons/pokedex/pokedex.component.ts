import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../model/pokemon.model';

@Component({
  selector: 'pk-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  @Input() pokemon?: Pokemon;
  constructor() { }

  ngOnInit(): void {
  }


}
