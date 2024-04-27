import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService :UserAuthService,private router :Router) {

}

  logout() {
    this.authService.logout(); // Implement the logout method in your AuthService
    this.router.navigate(['/Login']); // Redirect to the login page
 }
}
