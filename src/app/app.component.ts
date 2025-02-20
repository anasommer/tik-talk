import { ProfileService } from './data/services/profile.service';
import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  profileService = inject(ProfileService);
  profiles: any = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((val) => {
      this.profiles = val;
    });
  }
}
