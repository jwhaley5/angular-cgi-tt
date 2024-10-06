import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { mockBackendProvider } from './helpers/mock-backend';
import { routes } from './app.routes';
import { ThemeService } from './services/theme.service';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    mockBackendProvider,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ThemeService,
  ],
};
