import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private usersService: UsersService, private router: Router ) {}
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise (resolve=>{
      this.usersService.authActivate().then( resp => {
        if(!resp){
          this.router.navigateByUrl('/login');
          resolve(false);
        }else{
          resolve(true);
        }
      })
    });
  }

}
