import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App{
  protected title = 'NGSOCIAL';
}
