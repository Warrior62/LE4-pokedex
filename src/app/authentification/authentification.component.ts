import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'pk-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  token?: string

  constructor(private authService: AuthentificationService, private teamService: TeamService, private route: Router) { }

  ngOnInit(): void {
  }

  signup(mail: string, pwd: string){
    this.authService.signup(mail, pwd).subscribe(res => {
      console.log(res)
    })
  }

  login(mail: string, pwd: string){
    this.authService.login(mail, pwd).subscribe(res => {
      alert(`Bienvenue ${mail} !`)
      this.token = res.access_token
      console.log(res.access_token)
      this.route.navigate(["/pokedex"])
      this.authService.getMyTeam(this.token).subscribe(res => {
        console.log(`getMyteam = ${res}`)
      })
    })
  }
}
