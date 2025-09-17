import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// MODELS
import { User } from '../../../../models/user.model';
import { Follow } from '../../../../models/follow.model';
import { Message } from '../../../../models/message.model';
// SERVICIOS
import { UserService } from '../../../../services/user.service';
import { MessageService } from '../../../../services/message..service';
import { FollowService } from '../../../../services/follow.service';
import { global } from '../../../../services/global';


@Component({
  selector: 'app-add',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
  providers: [UserService, FollowService, MessageService]
})
export class Add implements OnInit{
  public title:string;
  public message: Message;
  public identity: any;        // Datos del usuario autenticado (copia de user)
  public token: any;           // Token de autenticación
  public url: any;             // URL base de la API
  public page: any;
  public next_page: any;
  public prev_page: any;
  public status:any;
  public follows:any;

  constructor(
    private _route: ActivatedRoute,          // Router para navegación
    private _router: Router,                // Router para navegación
    private _userService: UserService,      // Servicio para operaciones de user
    private _followService: FollowService, // Servicio para operaciones de follow
    private _messageService: MessageService, // Servicio para operaciones de message
  ){
    this.title = 'Enviar mensaje';
    this.identity = this._userService.getIdentity();            // Obtener datos del usuario desde localStorage
    this.token = this._userService.getToken();              // Obtener token desde localStorage
    this.url = global.url;     
    this.message = new Message('','','','',this.identity,'');

  }

  ngOnInit(){
    console.log('add.comnponent cargado...');
    this.getMyFollows();
  }

  getMyFollows(){
    this._followService.getFollowing(this.token).subscribe(
      response =>{
        console.log(response);
        
        this.follows = response.followingUsers;
      },
      error => {
        const errorMessage = <any>error
        console.log('errorMessage: ',errorMessage);

        if (errorMessage !=null) {
          this.status = 'error';
        }
      }
    )
  }

  onSubmit(form:any){
    console.log(this.message);
    this._messageService.addMessage(this.token, this.message).subscribe(
      response => {
        if (response.message) {
          this.status = 'success';
          form.reset()
        }
      },
      error => {
        const errorMessage = <any>error
        console.log('errorMessage: ',errorMessage);

        if (errorMessage !=null) {
          this.status = 'error';
        }
      }
    )
  }
}