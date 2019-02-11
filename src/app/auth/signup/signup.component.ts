import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date;
  isLoading = false;
  private loadingSubs: Subscription;
  constructor(private auth: AuthService, private ui: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.ui.loadingContentChanged.subscribe(isLoadingState => this.isLoading = isLoadingState);
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
      this.loadingSubs.unsubscribe();
    }
  }
}
