import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Reservation } from '../../models/reservation.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges {
  @Input() reservations: Reservation[] = [];
  @Output() visibleDatesChange = new EventEmitter<{ start: Date; end: Date }>();
  currentMonthYear: string = '';

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'de',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    events: [],
    eventContent: (arg: any) => {
      return {
        html: arg.event.extendedProps.name
      };
    },
    datesSet: (dateInfo) => {
      this.visibleDatesChange.emit({
        start: dateInfo.start,
        end: dateInfo.end
      });
      const firstVisibleDate = new Date(dateInfo.start);
      firstVisibleDate.setDate(1);
      this.updateCurrentMonth(firstVisibleDate);
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reservations']) {
      this.updateEvents();
    }
  }

  private updateEvents() {
    const events = this.reservations.map(reservation => {
      const startDate = this.parseGermanDate(reservation.von);
      const endDate = this.parseGermanDate(reservation.bis);
      
      if (startDate.getTime() === endDate.getTime()) {
        endDate.setDate(endDate.getDate() + 1);
      } else {
        endDate.setDate(endDate.getDate() + 1);
      }
      
      return {
        title: reservation.name,
        start: startDate,
        end: endDate,
        allDay: true,
        extendedProps: {
          name: reservation.name
        }
      };
    });

    this.calendarOptions.events = events;
  }

  private parseGermanDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(num => parseInt(num));
    return new Date(2000 + year, month - 1, day);
  }

  private updateCurrentMonth(date: Date) {
    const monthNames = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    this.currentMonthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
} 