import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosGuard implements CanActivate {

  constructor( private usersService: UsersService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.usersService.role == 'Afiliado' ||this.usersService.role == 'Dirigente'){

        return true;
      }else{
        this.router.navigateByUrl('/home');
        return false;
      }

  }

}
