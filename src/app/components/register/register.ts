import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [FormsModule, CommonModule, HttpClientModule],
  styleUrl: './register.css',
  providers: [UserService] //sirve para inyectar el servicio en el componente y que este disponible en todo el componente, ya que si no se inyecta, no se puede usar el servicio en el componente
})
export class Register {
  public title:string | undefined;
  public user: User;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = 'Registrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(){
    console.log('Register component initialized');
  }

  status:any;
  // Add the onSubmit method
  onSubmit(form: any) {
    console.log('Formulario enviado', this.user);
    this._userService.register(this.user).subscribe(
      response => {
        
        if (response.user && response.user._id) {
          console.log(response.user);
          this.status = 'success';
          form.reset();
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
    // You can add further logic to handle the form submission here
  }



}
