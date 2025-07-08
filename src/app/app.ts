import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  imports: [RouterModule,HttpClientModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
  providers: [UserService]
})
export class App implements OnInit, DoCheck{
  public title:any;
  public identity:any;
  public url:any;

  constructor(
    private _userService: UserService,
    private _router: Router
  ){
    this.title = 'NGSOCIAL';
    this.url = global.url;
  }

  /**
   * ngOnInit se ejecuta una sola vez cuando el componente se inicializa.
   * Es el lugar ideal para:
   * - Cargar datos iniciales
   * - Realizar configuraciones iniciales
   * - Suscribirse a observables
   */
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log('(app.ts) identity: ',this.identity);
    this.getCounters();
  }

  /**
   * ngDoCheck se ejecuta en cada ciclo de detección de cambios de Angular.
   * Es útil para:
   * - Detectar cambios que Angular no detecta automáticamente
   * - Mantener datos sincronizados (como la identidad del usuario)
   * - Actualizar el estado de la aplicación en tiempo real
   * 
   * En este caso, se usa para mantener actualizada la identidad del usuario
   * cada vez que hay un cambio en la aplicación (login/logout)
   */
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/']);
  }

  getCounters(){
    this._userService.getCounters().subscribe(
      response => {
        console.log(response);
        localStorage.setItem('stats',JSON.stringify(response));
      },
      error => {
        console.log(<any>error);   
      }
    )
  }
}
