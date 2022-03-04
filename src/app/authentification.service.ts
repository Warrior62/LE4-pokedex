import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from './authentification/model/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  pokemonsUrl: string = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io'

  signup(mail: string, pwd: string): Observable<any>{
    console.log("signup: ", mail, pwd)
    return this.http.post<any>(this.pokemonsUrl + '/trainers', {
      "email": mail,
      "password": pwd
    });
  }

  login(mail: string, pwd: string): Observable<Token>{
    console.log("login")
    return this.http.post<Token>(this.pokemonsUrl + '/auth/login', {
      "email": mail,
      "password": pwd
    });
  }

  getMyTeam(token: string): Observable<any>{
    console.log("login")
    return this.http.get<any>(this.pokemonsUrl + '/trainers/me/team', {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
    });
  }
}
