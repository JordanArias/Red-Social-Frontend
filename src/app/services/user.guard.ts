import { Injectable } from '@angular/core'; // Importa el decorador Injectable para permitir la inyección de dependencias.
import { Router, CanActivate} from '@angular/router';
import { UserService } from './user.service';



//@Injectable() // Marca la clase como un servicio que puede ser inyectado en otros componentes o servicios.
@Injectable({
    providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class UserGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _userService: UserService
    ){}

    canActivate(): boolean {


        let identity = this._userService.getIdentity();
        console.log('IDENTITY: ',identity);
        

        if (identity && (identity.role == 'ROLE_USER' || identity.role == 'ROLE_ADMIN')) {
            return true;
        }else{
            this._router.navigate(['/login'])
            return false;
        }

    }

}