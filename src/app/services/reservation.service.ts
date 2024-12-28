import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly SHEET_ID = '10E31jYkhiKE_bjMnlxwVItd_X2Z6Fxs_uO6yhD_9Fxg';
  private readonly SHEET_RANGE = 'A2:H1000';
  private readonly API_KEY = 'AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${this.SHEET_RANGE}?key=${this.API_KEY}`;
    
    return this.http.get<any>(url).pipe(
      map(response => {
        if (!response.values) return [];
        
        return response.values
          .filter((row: string[]) => row[7]?.toLowerCase() === 'ja')
          .map((row: string[]) => ({
            timestamp: this.parseGermanDateTime(row[0]),
            name: row[1],
            personen: parseInt(row[2]),
            von: row[3],
            bis: row[4],
            checkout: this.formatCheckoutTime(row[5]),
            telefon: row[6],
            status: 'bestätigt'
          }));
      }),
      catchError(error => {
        console.error('Fehler beim Laden der Reservierungen:', error);
        throw error;
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
          
          return (vonDate <= end && bisDate >= start);
        });
      })
    );
  }

  private parseGermanDate(dateStr: string): Date {
    try {
      const [day, month, year] = dateStr.split('.').map(num => parseInt(num));
      return new Date(year, month - 1, day);
    } catch (error) {
      console.error('Fehler beim Parsen des Datums:', dateStr, error);
      return new Date();
    }
  }

  private parseGermanDateTime(dateTimeStr: string): string {
    try {
      const [datePart, timePart] = dateTimeStr.split(' ');
      const [day, month, year] = datePart.split('.').map(num => parseInt(num));
      const [hours, minutes, seconds] = timePart.split(':').map(num => parseInt(num));
      
      const date = new Date(year, month - 1, day, hours, minutes, seconds);
      return date.toISOString();
    } catch (error) {
      console.error('Fehler beim Parsen von Datum und Zeit:', dateTimeStr, error);
      return new Date().toISOString();
    }
  }

  private formatCheckoutTime(timeStr: string): string {
    try {
      const [hours, minutes] = timeStr.split(':');
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error('Fehler beim Formatieren der Checkout-Zeit:', timeStr, error);
      return timeStr;
    }
  }
} 