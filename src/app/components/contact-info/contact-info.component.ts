import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {
  mapUrl = 'https://www.google.com/maps?q=Wanneggweg+12,+3715+Adelboden';
} 
