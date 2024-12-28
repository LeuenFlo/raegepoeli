import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ReservationTableComponent } from '../../components/reservation-table/reservation-table.component';
import { CurrentOccupancyComponent } from '../../components/current-occupancy/current-occupancy.component';
import { Reservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

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
  isLoading = false;
  error: string | null = null;

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
    this.isLoading = true;
    this.error = null;

    this.reservationService.getReservationsForDateRange(start, end)
      .pipe(
        catchError(error => {
          console.error('Fehler beim Laden der Reservierungen:', error);
          this.error = 'Die Reservierungen konnten nicht geladen werden. Bitte versuchen Sie es später erneut.';
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(reservations => {
        this.reservations = reservations;
      });
  }
} 