import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Route } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router, private store: Store<fromRoot.State>) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // if (this.auth.isAuth()) {
    //   return true;
    // }  else {
    //   this.router.navigate(['/login']);
    // }

    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route): Observable<boolean> {
    // if (this.auth.isAuth()) {
    //   return true;
    // }  else {
    //   this.router.navigate(['/login']);
    // }
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}

