import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isAuth()) {
      return true;
    }  else {
      this.router.navigate(['/login']);
    }
  }

  canLoad(route: Route): boolean {
    if (this.auth.isAuth()) {
      return true;
    }  else {
      this.router.navigate(['/login']);
    }
  }
}

