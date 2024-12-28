import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <div class="nav-container">
        <h1>{{ title }}</h1>
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Übersicht</a>
          <a routerLink="/kontakt" routerLinkActive="active">Kontakt & Preise</a>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  title = 'Chalet Rägepöli';
} 