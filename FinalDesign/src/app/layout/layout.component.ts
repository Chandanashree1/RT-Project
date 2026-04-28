import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet, CommonModule],
  template: `
    <app-navbar></app-navbar>

    <div class="layout">
      <app-sidebar></app-sidebar>

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
    }
    .content {
      flex: 1;
      padding: 20px;
    }
  `]
})
export class LayoutComponent {}
