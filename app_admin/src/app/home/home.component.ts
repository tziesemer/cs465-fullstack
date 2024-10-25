import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  constructor(
    private authenticationService: AuthenticationService
  ){}

  ngOnInit(): void{}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
