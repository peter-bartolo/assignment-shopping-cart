import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../authentication/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.authService.logout();
  }
}
