import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PagedData } from './model/paged-data.model';
import { Pokemon } from './model/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  pokemonsUrl: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io'

  getPokemons(): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonsUrl + '/pokemons?offset=0&limit=20');
  }

  getPokemonsWithOffset(offset?: number): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonsUrl + `/pokemons?offset=${offset}&limit=20`);
  }

  getPokemonsBySearch(pattern?: string): Observable<PagedData<Pokemon>>{
    return this.http.get<PagedData<Pokemon>>(this.pokemonsUrl + `/pokemons?search=${pattern}`);
  }

  getPokemonDetail(id : number): Observable<Pokemon>{
    const url = this.pokemonsUrl + '/pokemons/' + id;
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => console.log("fetched pokemon id=" + id))
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.pokemonsUrl + "/pokemons/" + id).pipe(tap(() => {console.log("fetched pokemon id " + id)}))
  }
}
