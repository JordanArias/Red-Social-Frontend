import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NgForm,FormsModule } from '@angular/forms';
import { error } from 'jquery';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  public title:any;

  constructor(
  ){
    this.title= 'Bienvenido a NGSocial';
  }

  ngOnInit(): void {
    console.log('home.Component cargado!!');
  }
}
