import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { Component } from '@angular/core';

@Component({
  selector: 'nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [CommonModule],
})
export class NavComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
