import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, public themeService: ThemeService) {
    this.signupForm = this.fb.group({
      username: [''],
      password: [''],
      display_name: [''],
      email: ['']
    });
  }

  onSignup() {
    const { username, password, display_name, email } = this.signupForm.value;
    this.authService.signup(username, password, display_name, email).subscribe({
      next: response => {
        console.log('Signup successful', response);
      },

      error: error => {
        console.error('Signup error', error);
      }
    });
  }
}
