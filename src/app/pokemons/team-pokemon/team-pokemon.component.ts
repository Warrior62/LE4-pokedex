import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthentificationService } from 'src/app/authentification.service';
import { TeamService } from 'src/app/team.service';
import { Pokemon } from '../model/pokemon.model';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'pk-team-pokemon',
  templateUrl: './team-pokemon.component.html',
  styleUrls: ['./team-pokemon.component.scss']
})
export class TeamPokemonComponent implements OnInit {

  pokemons: Pokemon[] = [];
  @Output() displayDetailEvent = new EventEmitter<Pokemon>();

  constructor(private authService: AuthentificationService, private teamService: TeamService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.initTeam()
  }

  initTeam() : void{
    console.log('initTeam')
    if(this.authService.token){
      this.authService.loginByToken(this.authService.token)
      this.authService.getMyTeam(this.authService.token).subscribe(data => {
        this.teamService.teamIds = data
        this.getPokemonsTeam()
        this.teamService.subject.next(data)
      })
    }
  }

  getPokemonsTeam() {
    this.teamService.subject.subscribe(idsReceived => {
      console.log('getPokemonsTeam')
      this.teamService.getTeam().pipe(
        switchMap(arrayIds => {
          this.teamService.teamIds = idsReceived;
          const pokemonObservables : Observable<Pokemon>[] = arrayIds.map((id: number) => this.pokemonService.getPokemonById(id))
          return forkJoin(pokemonObservables);
        })
      ).subscribe(arrayPokemons => this.pokemons = arrayPokemons)
    })
  }

  rmPkFromTeam(pk?: Pokemon){
    if(pk)
      this.teamService.removePokemonFromTeam(pk.id)
  }

  displayDetails(pk?: Pokemon){
    this.displayDetailEvent.emit(pk)
  }
}
