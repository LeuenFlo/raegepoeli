import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ReservationTableComponent } from '../../components/reservation-table/reservation-table.component';
import { CurrentOccupancyComponent } from '../../components/current-occupancy/current-occupancy.component';
import { Reservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';

interface DateRange {
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    ReservationTableComponent,
    CurrentOccupancyComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {
    this.loadInitialReservations();
  }

  private loadInitialReservations() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.loadReservationsForDateRange(start, end);
  }

  onVisibleDatesChange(dateRange: DateRange): void {
    this.loadReservationsForDateRange(dateRange.start, dateRange.end);
  }

  private loadReservationsForDateRange(start: Date, end: Date) {
    this.reservationService.getReservationsForDateRange(start, end)
      .subscribe(reservations => {
        this.reservations = reservations;
      });
  }
} 