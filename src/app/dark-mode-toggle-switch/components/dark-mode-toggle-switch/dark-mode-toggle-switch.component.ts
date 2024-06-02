import { Component } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-dark-mode-toggle-switch',
  templateUrl: './dark-mode-toggle-switch.component.html',
  styleUrl: './dark-mode-toggle-switch.component.scss'
})
export class DarkModeToggleSwitchComponent {

  constructor(public themeService: ThemeService) {
  }

  handleToggle(isChecked: boolean) {
    console.log('Dark mode is now', isChecked ? 'on' : 'off');
    if (isChecked)
      this.themeService.toggleDarkMode()
    else this.themeService.toggleLightMode()
  }
}
