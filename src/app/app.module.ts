import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from '@core/providers/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { DarkModeToggleSwitchModule } from './dark-mode-toggle-switch/dark-mode-toggle-switch.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    DarkModeToggleSwitchModule
  ],
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      }),
    ),
    provideHttpClient(
      withFetch(), // Enable fetch for HttpClient
      withInterceptors([authInterceptor]) // Enable interceptor
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
