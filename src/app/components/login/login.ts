import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  public title:string | undefined;

  constructor(){
    this.title = 'Identificate';
  }

  ngOnInit(){
    console.log('Login component initialized');
  }
}
