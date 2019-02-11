import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;
  constructor(private auth: AuthService, private ui: UIService) { }

  ngOnInit() {
    this.loadingSubs = this.ui.loadingContentChanged.subscribe(isLoadingState => this.isLoading = isLoadingState);
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.auth.login({
      email: this.form.value.email,
      password: this.form.value.password
    });
  }
  ngOnDestroy(): void {
    if (this.loadingSubs) {
    this.loadingSubs.unsubscribe();
    }
  }

}
