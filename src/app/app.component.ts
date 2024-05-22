import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  profile: any = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, public themeService: ThemeService) {
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
    this.apiService.login(username, password).subscribe(response => {
      console.log('Login successful', response);
      localStorage.setItem('token', response.token);
    }, error => {
      console.error('Login error', error);
    });
  }

  onSignup() {
    const { username, password, displayName, email } = this.signupForm.value;
    this.apiService.signup(username, password, displayName, email).subscribe(response => {
      console.log('Signup successful', response);
    }, error => {
      console.error('Signup error', error);
    });
  }

  onGetProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getProfile(token).subscribe(response => {
        this.profile = response;
      }, error => {
        console.error('Get profile error', error);
      });
    } else {
      console.error('No token found');
    }
  }

  onLogout() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.logout(token).subscribe(response => {
        console.log('Logout successful', response);
        localStorage.removeItem('token');
        this.profile = null;  // Limpia la información del perfil
      }, error => {
        console.error('Logout error', error);
      });
    } else {
      console.error('No token found');
    }
  }
}
