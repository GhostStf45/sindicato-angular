import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class AfiliadosGuard implements CanActivate {

  constructor( private usersService: UsersService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.usersService.role == 'Afiliado' ||this.usersService.role == 'Dirigente' || this.usersService.role == 'Abogado'){

        if( this.usersService.estado == 'Inhabilitado' || this.usersService.estado == ''){
          Swal.fire('Error', "Usted esta inhabilitado por dicisión de la dirigencia, porfavor comuniquese con el dirigente", 'error');
          this.router.navigateByUrl('/contact');
          return false;
        }
        else{

          return true;
        }
      }else{
        this.router.navigateByUrl('/home');
        return false;
      }

  }

}
