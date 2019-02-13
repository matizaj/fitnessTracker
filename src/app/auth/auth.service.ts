
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private authfire: AngularFireAuth, private trainingService: TrainingService,
   private ui: UIService, private store: Store<fromRoot.State>) {

  }
  initAuthListener() {
    this.authfire.authState.subscribe(user => {
      if (user) {
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        // this.isAuthenticated = false;
        // this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnAuthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
  this.store.dispatch(new UI.StartLoading());
   this.authfire.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
     console.log(result);
     // this.ui.loadingContentChanged.next(true);
     this.store.dispatch(new UI.StopLoading());
    })
    .catch(err => {
      this.ui.showSnackBar(err.message, null, 3000);
      // this.ui.loadingContentChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    });

  }

  login(authData: AuthData) {
    // this.ui.loadingContentChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.authfire.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
      // this.ui.loadingContentChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
     })
     .catch(err => {
      this.ui.showSnackBar(err.message, null, 3000);
      // this.ui.loadingContentChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
     });
  }

  logout() {
    this.authfire.auth.signOut();

  }

  // isAuth() {
  //   return this.isAuthenticated;
  // }

  }
