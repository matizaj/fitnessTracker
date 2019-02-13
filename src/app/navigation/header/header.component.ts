import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth: boolean;
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  constructor(private auth: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubscription = this.auth.authChange.subscribe(data => {
    //   this.isAuth = data;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.auth.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
