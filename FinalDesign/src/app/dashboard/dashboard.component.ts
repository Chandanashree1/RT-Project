
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {

//   constructor(private router: Router) {}
//    users = [
//     {
//       name: 'John',
//       role: 'MEAN Stack',
//       date: '15-12-2023',
//       status: 'Java Completed',
//       skills: {
//         bootstrap: 40,
//         html: 60,
//         css: 40,
//         javascript: 70,
//         angular: 60,
//         node: 60
//       }
//     },
//     {
//       name: 'Sanjay',
//       role: 'MERN Stack',
//       date: '12-12-2023',
//       status: 'Python Running',
//       skills: {
//         bootstrap: 100,
//         html: 100,
//         css: 30,
//         javascript: 60,
//         angular: 50,
//         node: 40
//       }
//     }
//   ];
     

//   openUser(user: any) {
//     this.router.navigate(['/user-details'], {
//       state: { user }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  openUser(user: any) {
    this.router.navigate(['/user-details'], {
      state: { user }
    });
  }
}