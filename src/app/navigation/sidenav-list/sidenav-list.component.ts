import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.auth.authChange.subscribe(data => {
      this.isAuth = data;
    });
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
