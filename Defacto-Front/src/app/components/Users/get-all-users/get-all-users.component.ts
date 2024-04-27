import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../Models/iuser';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-get-all-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css'],
})
export class GetAllUsersComponent implements OnInit {
  //   defaultUsers: IUser[] = [
  //     {
  //       id: '0',
  //       userName: '',
  //       email: '',
  //       isBlocked: false,
  //      role: '',
  //      name: '',
  //      streetAddress: '',
  //      city: '',
  //      state: '',
  //      zipCode: '',
  //      country: '',
  //      password: '',
  //     },
  //  ];
  user: IUser[] = [];

  constructor(private userservice: UsersService,private cd: ChangeDetectorRef) {}




  ngOnInit(): void {
    this.fetchUsers(12, 1);
 }

 fetchUsers(page: number, pageSize: number): void {
    this.userservice.getAllUsers(page, pageSize).subscribe({
      next: (response) => {
        if (response.isSuccess && Array.isArray(response.entity)) {
          this.user = response.entity;
          this.updateBlockStatusFromLocalStorage();
          this.cd.detectChanges();
        } else {
          console.error('Error:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
 }

 updateBlockStatusFromLocalStorage(): void {
    this.user.forEach(userItem => {
      const isBlocke = localStorage.getItem(`user-${userItem.id}-isBlocke`);
      if (isBlocke !== null) {
        userItem.isBlocke = JSON.parse(isBlocke);
      }
    });
 }

 toggleBlockStatus(userItem: IUser) {
    userItem.isBlocke = !userItem.isBlocke;
    localStorage.setItem(`user-${userItem.id}-isBlocke`, JSON.stringify(userItem.isBlocke));
    const action = userItem.isBlocke ? 'block' : 'unblock';
    this.userservice.blockOrUnblockUser(userItem.id, userItem.isBlocke).subscribe({
      next: (res) => {
        console.log(`User ${action}ed successfully, res`);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error(`Error ${action}ing user`, error);
        alert(`Failed to ${action} user. Please try again.`);
        if (error instanceof HttpErrorResponse) {
          userItem.isBlocke = !userItem.isBlocke;
          this.cd.detectChanges();
        }
      },
    });
 }

  trackById(index: number, item: IUser): string {
    return item.id;
  }


}