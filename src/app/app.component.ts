import { Component } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from './core/services/theme.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  profile: any = null;
  allToekenInfo: any = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthService, public themeService: ThemeService) {
    this.themeService.toggleDarkMode();
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });

    this.signupForm = this.fb.group({
      username: [''],
      password: [''],
      displayName: [''],
      email: ['']
    });
  }

  handleToggle(isChecked: boolean) {
    console.log('Dark mode is now', isChecked ? 'on' : 'off');
    if (isChecked)
      this.themeService.toggleDarkMode()
    else this.themeService.toggleLightMode()
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: response => {
        console.log('Login successful', response);
        //this.apiService.setAccessToken(response.token);
      },
      error: error => {
        console.error('Login error', error);
      }
    });
  }

  onSignup() {
    const { username, password, displayName, email } = this.signupForm.value;
    this.authService.signup(username, password, displayName, email).subscribe({
      next: response => {
        console.log('Signup successful', response);
      },

      error: error => {
        console.error('Signup error', error);
      }
    });
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
