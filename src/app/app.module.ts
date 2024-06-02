import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchComponent } from './switch/switch.component';
import { authInterceptor } from '@core/providers/auth.interceptor';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule
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
