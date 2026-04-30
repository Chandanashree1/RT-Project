import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

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
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements AfterViewInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showForm = false;
  showSearch = false;
  editIndex: number | null = null;

  // 🔥 DELETE
  showDeleteConfirm = false;
  deleteIndex: number | null = null;
  deleteUserName = '';

  student = {
    name: '',
    email: '',
    role: '',
    password: ''
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: any, filter: string) =>
      Object.values(data).join(' ').toLowerCase().includes(filter);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) this.applyFilter('');
  }

  openForm() {
    this.showDeleteConfirm = false;
    this.editIndex = null;
    this.student = { name: '', email: '', role: '', password: '' };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  addUser() {

    if (!this.student.name || !this.student.email || !this.student.role) {
      alert("Fill all fields");
      return;
    }

    if (this.editIndex === null && !this.student.password) {
      alert("Password required");
      return;
    }

    const data = [...this.dataSource.data];

    if (this.editIndex !== null) {
      data[this.editIndex] = {
        ...data[this.editIndex],
        name: this.student.name,
        email: this.student.email,
        role: this.student.role
      };
    } else {
      data.push({ ...this.student });
    }

    this.dataSource.data = data;

    this.student = { name: '', email: '', role: '', password: '' };
    this.editIndex = null;
    this.showForm = false;
  }

  editUser(user: any, index: number) {
    this.student = { ...user, password: '' };
    this.editIndex = index;
    this.showForm = true;
  }

  // 🔥 DELETE CLICK
  deleteUser(index: number) {
    const user = this.dataSource.data[index];

    this.deleteIndex = index;
    this.deleteUserName = user.name;
    this.showDeleteConfirm = true;
  }

  // ✅ YES
  confirmDelete() {
    if (this.deleteIndex === null) return;

    const data = [...this.dataSource.data];
    data.splice(this.deleteIndex, 1);
    this.dataSource.data = data;

    this.showDeleteConfirm = false;
    this.deleteIndex = null;
  }

  // ❌ NO
  cancelDelete() {
    this.showDeleteConfirm = false;
    this.deleteIndex = null;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
