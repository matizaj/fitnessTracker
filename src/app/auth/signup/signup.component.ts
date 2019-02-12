import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  constructor(private auth: AuthService, private ui: UIService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.loadingSubs = this.ui.loadingContentChanged.subscribe(isLoadingState => this.isLoading = isLoadingState);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }


  onSubmit( form: NgForm) {
    this.auth.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
  ngOnDestroy(): void {
    if (this.loadingSubs) {
      // this.loadingSubs.unsubscribe();
    }
  }
}
