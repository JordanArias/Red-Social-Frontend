import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  public title:string | undefined;

  constructor(){
    this.title = 'Registrate';
  }

  ngOnInit(){
    console.log('Register component initialized');
  }
}
