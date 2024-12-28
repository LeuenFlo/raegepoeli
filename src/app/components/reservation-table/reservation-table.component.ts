import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Reservation } from '../../models/reservation.model';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-reservation-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.scss']
})
export class ReservationTableComponent {
  @Input() reservations: Reservation[] = [];
  
  displayedColumns: string[] = [
    'name',
    'personen',
    'von',
    'bis',
    'checkout',
    'telefon'
  ];

  constructor(private colorService: ColorService) {}

  getColorForName(name: string): { background: string; border: string } {
    return this.colorService.getColorForName(name);
  }

  formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    return phone.startsWith('00') ? '+' + phone.slice(2) : phone;
  }
} 