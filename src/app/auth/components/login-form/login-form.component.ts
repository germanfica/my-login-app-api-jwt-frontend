import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, public themeService: ThemeService) {
    this.themeService.toggleDarkMode();
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
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
}
