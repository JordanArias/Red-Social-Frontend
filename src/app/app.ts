import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Login } from './components/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App{
  protected title = 'NGSOCIAL';
}
