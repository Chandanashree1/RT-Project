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

    if (!this.showSearch) {
      this.applyFilter('');
    }
  }

  openForm() {
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

    // password only required for ADD
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
    this.student = { ...user, password: '' }; // 🔒 important
    this.editIndex = index;
    this.showForm = true;
  }

  deleteUser(index: number) {
    const data = [...this.dataSource.data];
    data.splice(index, 1);
    this.dataSource.data = data;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
