import { Injectable, Inject, Renderer2, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme = 'light-theme';
  private renderer: Renderer2;
  private isDarkMode: boolean = true;
  private isBrowser: boolean;

  constructor(rendererFactory: RendererFactory2, @Inject(PLATFORM_ID) platformId: Object) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.isDarkMode = this.getDarkModeState();
      this.setBodyClass();
    }
  }

  isDarkModeEnabled(): boolean {
    return this.isDarkMode;
  }

  toggleDarkMode() {
    this.isDarkMode = true;
    this.setDarkModeState(true);
    this.setBodyClass();
  }

  toggleLightMode() {
    this.isDarkMode = false;
    this.setDarkModeState(false);
    this.setBodyClass();
  }

  toggleBackgroundColor() {
    this.isDarkMode = !this.isDarkMode;
    this.setDarkModeState(this.isDarkMode);
    this.setBodyClass();
  }

  clearBackgroundClass() {
    if (this.isBrowser) {
      this.renderer.removeClass(document.body, 'dark-mode');
      this.renderer.removeClass(document.body, 'light-mode');
    }
  }

  setTheme(theme: string) {
    this.activeTheme = theme;
    localStorage.setItem('theme', theme);

    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(theme);
  }

  getActiveTheme(): string {
    return this.activeTheme;
  }

  private setBodyClass() {
    if (this.isBrowser) {
      if (this.isDarkMode) {
        this.renderer.addClass(document.body, 'dark-mode');
        this.renderer.removeClass(document.body, 'light-mode');
      } else {
        this.renderer.addClass(document.body, 'light-mode');
        this.renderer.removeClass(document.body, 'dark-mode');
      }
    }
  }

  private getDarkModeState(): boolean {
    let darkModeState: boolean;

    if (this.isBrowser) {
      const darkMode = localStorage.getItem('dark_mode_enabled');
      if (darkMode === null) {
        darkModeState = this.isDarkMode; // Default value
      } else {
        darkModeState = darkMode === 'true';
      }
    } else {
      darkModeState = this.isDarkMode;
    }

    return darkModeState;
  }

  private setDarkModeState(isEnabled: boolean) {
    if (this.isBrowser) {
      localStorage.setItem('dark_mode_enabled', isEnabled.toString());
    }
  }

  private removeDarkModeState() {
    if (this.isBrowser) {
      localStorage.removeItem('dark_mode_enabled');
    }
  }
}
