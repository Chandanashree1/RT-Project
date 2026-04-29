import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  user: any = history.state.user;

  goBack() {
    window.history.back();
  }

  // 🔥 SKILL LIST (for loop UI)
  get skillList() {
    if (!this.user?.skills) return [];

    return [
      { name: 'Bootstrap', value: this.user.skills.bootstrap },
      { name: 'HTML', value: this.user.skills.html },
      { name: 'CSS', value: this.user.skills.css },
      { name: 'JavaScript', value: this.user.skills.javascript },
      { name: 'Angular', value: this.user.skills.angular },
      { name: 'Node', value: this.user.skills.node }
    ];
  }

  // 🔥 OVERALL %
  get overall() {
    if (!this.user?.skills) return 0;

    const s = this.user.skills;
    return Math.round(
      (s.bootstrap + s.html + s.css + s.javascript + s.angular + s.node) / 6
    );
  }
}
