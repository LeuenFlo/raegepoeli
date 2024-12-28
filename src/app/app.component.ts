import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-nav></app-nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
  `],
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent]
})
export class AppComponent {
  title = 'Chalet Rägepöli';
}
