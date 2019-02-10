import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean;
  authSubscription: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.auth.authChange.subscribe(data => {
      this.isAuth = data;
    });
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
