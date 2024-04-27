import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../Models/iuser';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  successMessage: string = '';
  newAccount: IUser = {
    id: '',
    userName: '',
    email: '',
    isBlocke: false,
    roleName: '',
    name: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    password: '',
    Image: ''
  };
  roles = [

    { name: 'Admin' },
    { name: 'Vendor' },
  ];

  constructor(private userservice: UsersService, private router: Router) { }


  onSubmit() {
    this.userservice.createUser(this.newAccount).subscribe({
      next: (response) => {
        console.log(response);
        // Set the success message
        this.successMessage = 'User created successfully!';
        // Display an alert to the user
        window.alert(this.successMessage);
        // Navigate to another route
        this.router.navigate(['/GetAllUsers']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
        // Optionally, set an error message here
        this.successMessage = 'Failed to create user. Please try again.';
        // Display an alert for the error
        window.alert(this.successMessage);
      }
    });
  }


}