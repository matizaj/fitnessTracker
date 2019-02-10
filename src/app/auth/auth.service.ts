import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(private router: Router, private authfire: AngularFireAuth, private trainingService: TrainingService) {

  }
  initAuthListener() {
    this.authfire.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
   this.authfire.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(result => {
     console.log(result);
    })
    .catch(err => console.log(err));

  }

  login(authData: AuthData) {
    this.authfire.auth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
     })
     .catch(err => console.log(err));
  }

  logout() {
    this.authfire.auth.signOut();

  }

  getUser() {
  }

  isAuth() {
    return this.isAuthenticated;
  }

  }
