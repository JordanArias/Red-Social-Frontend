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

@Component({
  selector: 'app-add',
  imports: [],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add implements OnInit{
  public title:string;

  constructor(){
    this.title = 'Enviar mensaje';
  }

  ngOnInit(){
    console.log('add.comnponent cargado...');
  }

}