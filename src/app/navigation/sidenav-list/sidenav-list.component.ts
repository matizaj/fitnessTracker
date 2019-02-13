import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth = false;
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  constructor(private auth: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.authSubscription = this.auth.authChange.subscribe(data => {
    //   this.isAuth = data;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.onSidenavToggle();
    this.auth.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
