// import { Component, ViewChild, AfterViewInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { MatTableModule, MatTableDataSource } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   selector: 'app-users',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     MatTableModule,
//     MatButtonModule,
//     MatPaginatorModule,
//     MatIconModule
//   ],
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.css']
// })
// export class UsersComponent implements AfterViewInit {

//   displayedColumns: string[] = ['name', 'email', 'phone', 'test', 'actions'];

//   dataSource = new MatTableDataSource<any>([]);

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   showForm = false;
//   showSearch = false;
//   editIndex: number | null = null;
   
//     // 🔥 DELETE
//   showDeleteConfirm = false;
//   deleteIndex: number | null = null;
//   deleteUserName = '';

//   student = {
//     name: '',
//     email: '',
//     phone: '',
//     test: ''
//   };

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;

//     this.dataSource.filterPredicate = (data: any, filter: string) =>
//       Object.values(data).join(' ').toLowerCase().includes(filter);
//   }

//   toggleSearch() {
//     this.showSearch = !this.showSearch;

//     if (!this.showSearch) {
//       this.applyFilter('');
//     }
//   }

//   openForm() {
//     this.editIndex = null;
//     this.student = { name: '', email: '', phone: '', test: '' };
//     this.showForm = true;
//   }

//   closeForm() {
//     this.showForm = false;
//   }

//   addUser() {
//     if (!this.student.name || !this.student.email) {
//       alert("Fill all fields");
//       return;
//     }

//     const data = [...this.dataSource.data];

//     if (this.editIndex !== null) {
//       data[this.editIndex] = { ...this.student };
//     } else {
//       data.push({ ...this.student });
//     }

//     this.dataSource.data = data;

//     this.student = { name: '', email: '', phone: '', test: '' };
//     this.editIndex = null;
//     this.showForm = false;
//   }

//   editUser(user: any, index: number) {
//     this.student = { ...user };
//     this.editIndex = index;
//     this.showForm = true;
//   }

//   // deleteUser(index: number) {
//   //   const data = [...this.dataSource.data];
//   //   data.splice(index, 1);
//   //   this.dataSource.data = data;
//   // }
//   // 🔥 DELETE CLICK
//   deleteUser(index: number) {
//     const user = this.dataSource.data[index];

//     this.deleteIndex = index;
//     this.deleteUserName = user.name;
//     this.showDeleteConfirm = true;
//   }

//   // ✅ YES
//   confirmDelete() {
//     if (this.deleteIndex === null) return;

//     const data = [...this.dataSource.data];
//     data.splice(this.deleteIndex, 1);
//     this.dataSource.data = data;

//     this.showDeleteConfirm = false;
//     this.deleteIndex = null;
//   }

//   // ❌ NO
//   cancelDelete() {
//     this.showDeleteConfirm = false;
//     this.deleteIndex = null;
//   }

//   applyFilter(value: string) {
//     this.dataSource.filter = value.trim().toLowerCase();
//   }
// }
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'email', 'phone', 'test', 'actions'];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showForm = false;
  showSearch = false;
  editIndex: number | null = null;

  showDeleteConfirm = false;
  deleteUserId: number | null = null;   // 🔥 FIXED
  deleteUserName = '';

  student = {
    id: null as number | null,
    name: '',
    email: '',
    phone: '',
    test: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: any, filter: string) =>
      Object.values(data).join(' ').toLowerCase().includes(filter);
  }

  // 🔥 LOAD USERS
  loadUsers() {
    this.userService.getUsers().subscribe(res => {
      console.log("API DATA:", res); // 🔥 debug
      this.dataSource.data = res;
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.applyFilter('');
    }
  }

  openForm() {
    this.editIndex = null;
    this.student = { id: null, name: '', email: '', phone: '', test: '' };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  // 🔥 ADD / UPDATE
  addUser() {
    if (!this.student.name || !this.student.email) {
      alert("Fill all fields");
      return;
    }

    // UPDATE
    if (this.editIndex !== null) {

      if (!this.student.id) {
        alert("ID missing");
        return;
      }

      this.userService.updateUser(this.student.id, this.student).subscribe(() => {
        this.loadUsers();
      });

    } 
    // ADD
    else {
      this.userService.addUser(this.student).subscribe(() => {
        this.loadUsers();
      });
    }

    this.student = { id: null, name: '', email: '', phone: '', test: '' };
    this.editIndex = null;
    this.showForm = false;
  }

  // 🔥 EDIT
  editUser(user: any, index: number) {
    this.student = {
      id: user.id,   // 🔥 IMPORTANT
      name: user.name,
      email: user.email,
      phone: user.phone,
      test: user.test
    };

    this.editIndex = index;
    this.showForm = true;
  }

  // 🔥 DELETE CLICK
  deleteUser(index: number) {
    const user = this.dataSource.data[index];

    this.deleteUserName = user.name;
    this.deleteUserId = user.id; // 🔥 FIXED
    this.showDeleteConfirm = true;
  }

  // ✅ CONFIRM DELETE
  confirmDelete() {
    if (!this.deleteUserId) return;

    this.userService.deleteUser(this.deleteUserId).subscribe(() => {
      this.loadUsers();
    });

    this.showDeleteConfirm = false;
    this.deleteUserId = null;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.deleteUserId = null;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
