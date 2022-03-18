import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, switchMap } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Pokemon } from './pokemons/model/pokemon.model';
import { PokemonService } from './pokemons/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  //pokemons: Pokemon[] = [];
  teamIds: number[] = [];
  subject = new Subject<number[]>()


  constructor(
    private http: HttpClient,
    private authService: AuthentificationService) {}

  getTeam(): Observable<any> {
    var header = {
      headers: new HttpHeaders()
        .set("Authorization", "Bearer " + this.authService.token)
    }
    return this.http.get(this.authService.pokemonsUrl + "/trainers/me/team", header)
  }

  setMyTeam(team : number[]): Observable<any>{
    return this.http.put<[number]>(this.authService.pokemonsUrl + '/trainers/me/team', team, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authService.token})
    })
  }

  addPokemonToTeam(id: number){
    console.log(`pokemon added : ${id}`)
    if(this.teamIds.length < 6) {
      this.teamIds.push(id);
      this.setMyTeam(this.teamIds).subscribe(_ => {
        this.subject.next(this.teamIds)
        if(this.authService.token){
          console.log('UPDATE team')
          this.authService.getMyTeam(this.authService.token).subscribe(res => {})
        }
      })
    }
  }

  removePokemonFromTeam(id: number){
    var hasDeleted: boolean = false;
    this.teamIds.forEach((element,index)=>{
      if(element==id && !hasDeleted)
      {
        hasDeleted = true;
        this.teamIds.splice(index, 1);
        this.setMyTeam(this.teamIds).subscribe(_ => {
          console.log(`teamIds = ${this.teamIds}`)
          this.http.put<[number]>(this.authService.pokemonsUrl + '/trainers/me/team', this.teamIds, {
          headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authService.token})})
          this.subject.next(this.teamIds)
        })
      }
    });
  }
}
