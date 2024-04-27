
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: UserAuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) { // Assuming isLoggedIn() returns true if the user is logged in
      return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
    return true;
  }
}
