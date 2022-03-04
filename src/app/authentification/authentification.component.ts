import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'pk-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
  }

  signup(mail: string, pwd: string){
    this.authService.signup(mail, pwd).subscribe(res => {
      console.log(res)
    })
  }

  login(mail: string, pwd: string){
    this.authService.login(mail, pwd).subscribe(res => {
      console.log(res.access_token)
      alert('Bienvenue ' + mail)
      this.authService.getMyTeam(res.access_token).subscribe(res => {
        console.log(res)
      })
    })
  }
}
