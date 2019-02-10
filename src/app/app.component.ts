import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'NgMaterial';
  constructor(private auth: AuthService) {}
  onToggle() {

  }
  ngOnInit(): void {
    this.auth.initAuthListener();
  }
}
