import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly SHEET_ID = '10E31jYkhiKE_bjMnlxwVItd_X2Z6Fxs_uO6yhD_9Fxg';
  private readonly SHEET_RANGE = 'A2:G1000';  // Von A2 bis G1000 für alle Daten
  private readonly API_KEY = 'AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${this.SHEET_RANGE}?key=${this.API_KEY}`;
    
    return this.http.get<any>(url).pipe(
      map(response => {
        if (!response.values) return [];
        
        return response.values.map((row: string[]) => ({
          timestamp: row[0],
          name: row[1],
          personen: parseInt(row[2]),
          von: row[3],
          bis: row[4],
          checkout: row[5],
          telefon: row[6]
        }));
      })
    );
  }

  getCurrentReservation(): Observable<Reservation | null> {
    return this.getReservations().pipe(
      map(reservations => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return reservations.find(reservation => {
          const startDate = this.parseGermanDate(reservation.von);
          const endDate = this.parseGermanDate(reservation.bis);
          endDate.setHours(23, 59, 59);
          
          return today >= startDate && today <= endDate;
        }) || null;
      })
    );
  }

  getReservationsForDateRange(start: Date, end: Date): Observable<Reservation[]> {
    return this.getReservations().pipe(
      map(reservations => {
        return reservations.filter(reservation => {
          const vonDate = this.parseGermanDate(reservation.von);
          const bisDate = this.parseGermanDate(reservation.bis);
          
          // Überprüfe, ob die Reservierung im sichtbaren Bereich liegt
          return (vonDate <= end && bisDate >= start);
        });
      })
    );
  }

  private parseGermanDate(dateStr: string): Date {
    // Konvertiert deutsches Datumsformat (DD.MM.YY) in Date-Objekt
    const [day, month, year] = dateStr.split('.').map(num => parseInt(num));
    return new Date(2000 + year, month - 1, day); // Jahr 20XX
  }
} 