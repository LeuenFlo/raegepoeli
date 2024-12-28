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
  private _reservations: Reservation[] = [];
  
  @Input() 
  set reservations(value: Reservation[]) {
    this._reservations = this.sortReservations(value);
  }
  
  get reservations(): Reservation[] {
    return this._reservations;
  }

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

  getWhatsAppLink(reservation: Reservation): string {
    const phoneNumber = this.formatPhoneNumber(reservation.telefon).replace(/\s+/g, '');
    const message = `Hallo ${reservation.name}, `;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  isCurrentReservation(reservation: Reservation): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = this.parseGermanDate(reservation.von);
    const endDate = this.parseGermanDate(reservation.bis);
    endDate.setHours(23, 59, 59);
    
    return today >= startDate && today <= endDate;
  }

  isPastReservation(reservation: Reservation): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const endDate = this.parseGermanDate(reservation.bis);
    endDate.setHours(23, 59, 59);
    
    return endDate < today;
  }

  private sortReservations(reservations: Reservation[]): Reservation[] {
    return [...reservations].sort((a, b) => {
      const aIsCurrent = this.isCurrentReservation(a);
      const bIsCurrent = this.isCurrentReservation(b);
      
      if (aIsCurrent && !bIsCurrent) return -1;
      if (!aIsCurrent && bIsCurrent) return 1;
      
      // Wenn keiner oder beide aktuell sind, nach Datum sortieren
      const aDate = this.parseGermanDate(a.von);
      const bDate = this.parseGermanDate(b.von);
      return aDate.getTime() - bDate.getTime();
    });
  }

  private parseGermanDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(num => parseInt(num));
    return new Date(year, month - 1, day);
  }
} 