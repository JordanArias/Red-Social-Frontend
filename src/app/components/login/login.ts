import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NgForm,FormsModule } from '@angular/forms';
import { error } from 'jquery';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [UserService]
})
export class Login {
  public title:string | undefined;
  public user: User;
  public identity:any;
  public token: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Identificate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){
    console.log('Login component initialized');
  }

  status:any;
  onSubmit(form: any){
    this._userService.singup(this.user, null).subscribe(
      response =>{
        
        this.identity = response.user
        console.log('IDENTITY: ',this.identity);

        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        }else{
          this.status = 'success';
          //PERSISTIR DATOS DEL USUARIO
          localStorage.setItem('identity',JSON.stringify(this.identity));
          //CONSEGUIR EL TOKEN
          this.getToken();
        }

      },
      error =>{

        const errorMessage = <any>error
        console.log('errorMessage: ',errorMessage);

        if (errorMessage !=null) {
          this.status = 'error';
        }

      }
    )
    
  }


  getToken(){
    this._userService.singup(this.user, 'true').subscribe(
      response =>{
        this.token = response.token;
        console.log('TOKEN: ',this.token);

        if (this.token.length <= 0) {
          this.status = 'error';
        }else{
          this.status = 'success';
          //PERSISTIR TOKEN DEL USUARIO
          localStorage.setItem('token',JSON.stringify(this.token));
          //CONSEGUIR CONTADORES O ESTADISTICAS DEL USUARIO
        }

      },
      error =>{

        const errorMessage = <any>error
        console.log('errorMessage: ',errorMessage);

        if (errorMessage !=null) {
          this.status = 'error';
        }

      }
    )
  }
}


