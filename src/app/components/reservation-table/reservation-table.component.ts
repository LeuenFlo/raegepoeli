import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Reservation } from '../../models/reservation.model';

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
} 