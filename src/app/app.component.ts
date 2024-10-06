import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetType } from './models/asset';
import { AssetService } from './services/asset.service';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.compenent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

  providers: [AssetService], // Ensure AssetService is provided here
})
export class AppComponent {
  title = 'Angular JW';
  assets: AssetType[] = [];
  isDarkTheme = false; // New property to track theme state

  constructor(
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.loadThemePreference(); // Load saved theme preference if any
  }

  // Function to toggle between light and dark themes
  public toggleTheme() {
    this.themeService.toggleTheme(); // Use the service to toggle theme
  }

  // Load saved theme from localStorage
  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }
}
