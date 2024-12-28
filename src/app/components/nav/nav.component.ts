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
  styles: [`
    nav {
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .nav-container {
      max-width: 1600px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      font-size: 1.5rem;
      color: var(--color-primary);
      margin: 0;
    }

    .nav-links {
      display: flex;
      gap: 1rem;

      a {
        color: var(--color-text);
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: background-color 0.2s;

        &:hover {
          background-color: #f5f5f5;
        }

        &.active {
          color: var(--color-primary);
          background-color: #e3f2fd;
        }
      }
    }
  `]
})
export class NavComponent {
  title = 'Chalet Rägepöli';
} 