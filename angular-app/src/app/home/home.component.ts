import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersList: User[] = [];
  firstName: string = '';  // <-- add these
  lastName: string = '';   // <-- add these

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      res.map((obj: User) => {
        this.usersList.push(obj);
      });
    },
      error => {
        alert(error);
      });
  }

  addUser() {   // <-- remove parameters, use component variables
    this.userService.addUser(this.firstName, this.lastName).subscribe(res => {
      window.location.reload();
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(res => {
      window.location.reload();
    });
  }
}