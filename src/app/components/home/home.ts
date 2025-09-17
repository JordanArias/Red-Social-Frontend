import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule} from '@angular/router';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NgForm,FormsModule } from '@angular/forms';
import { error } from 'jquery';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [UserService]
})
export class Home implements OnInit{
  public title:any;
  public identity:any;

  constructor(
    private _userService: UserService
  ){
    this.title= 'Bienvenido a la RedSocial';
  }

  ngOnInit(): void {
    console.log('home.Component cargado!!');
    this.identity = this._userService.getIdentity();
  }
}
