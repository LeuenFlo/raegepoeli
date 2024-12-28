import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from '../../components/contact-info/contact-info.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ContactInfoComponent],
  template: `
    <div class="container">
      <app-contact-info></app-contact-info>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1600px;
      margin: 0 auto;
    }
  `]
})
export class ContactComponent {} 