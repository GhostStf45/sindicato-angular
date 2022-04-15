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
export class DirigenteGuard implements CanActivate {
  constructor(private usersService: UsersService,
    private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {

      if(this.usersService.role == 'Dirigente'){


        return true;
      }else{
        Swal.fire('Error', "Solo los dirigentes pueden acceder a esta pagina", 'error');
        this.router.navigateByUrl('panel/dashboard-afiliados');
        return false;
      }

    return true;
  }

}
