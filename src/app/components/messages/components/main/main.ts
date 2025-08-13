import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { Follow } from '../../../../models/follow.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { global } from '../../../../services/global';
import { FollowService } from '../../../../services/follow.service';
import { Sidebar } from '../../../sidebar/sidebar'; 
import { error } from 'jquery';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit{
  public title:string;

  constructor(){
    this.title = 'Mensajes privados';
  }

  ngOnInit(){
    console.log('main.comnponent cargado...');
  }

}
