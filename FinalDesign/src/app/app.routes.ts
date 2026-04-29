// import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { LayoutComponent } from './layout/layout.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { UsersComponent } from './users/users.component';
// export const routes: Routes = [
//   { path: '', component: LoginComponent },

//   {
//     path: '',
//     component: LayoutComponent,
//     children: [
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'users', component: UsersComponent } 
//     ]
//   }
// ];
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component'; // ✅ ADD THIS

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },

      // 🔥 ADD THIS LINE
      { path: 'user-details', component: UserDetailsComponent }
    ]
  }
];
