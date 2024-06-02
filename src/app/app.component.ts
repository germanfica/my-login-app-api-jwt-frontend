import { Component } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profile: any = null;
  allToekenInfo: any = null;

  constructor(private apiService: ApiService, private authService: AuthService, public themeService: ThemeService) {
    this.themeService.toggleDarkMode();
  }

  handleToggle(isChecked: boolean) {
    console.log('Dark mode is now', isChecked ? 'on' : 'off');
    if (isChecked)
      this.themeService.toggleDarkMode()
    else this.themeService.toggleLightMode()
  }

  onGetProfile() {
    const token = this.authService.getAccessToken();

    if (token) {
      this.apiService.getProfile().subscribe({
        next: response => {
          this.profile = response;
        },
        error: error => {
          console.error('Get profile error', error);
        }
      });
    } else {
      console.error('No token found');
    }

    const allInfo = this.authService.getAllInfo();

    this.allToekenInfo = allInfo;

    console.table(allInfo);
  }

  onLogout() {
    const token = this.authService.getAccessToken();
    if (token) {
      this.authService.logout().subscribe(
        {
          next: response => {
            console.log('Logout successful', response);
            this.profile = null;  // Limpia la información del perfil
            this.allToekenInfo = null;
          },
          error: error => {
            console.error('Logout error', error);
          }
        });
    } else {
      console.error('No token found');
    }
  }
}
