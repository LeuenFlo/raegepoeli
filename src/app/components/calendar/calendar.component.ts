import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Reservation } from '../../models/reservation.model';
import { ColorService } from '../../services/color.service';
import deLocale from '@fullcalendar/core/locales/de';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnChanges, OnInit {
  @Input() reservations: Reservation[] = [];
  @Output() visibleDatesChange = new EventEmitter<{ start: Date; end: Date }>();
  currentMonthYear: string = '';
  isMobile: boolean = false;

  constructor(private colorService: ColorService) {}

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: deLocale,
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: ''
    },
    height: 'auto',
    firstDay: 1,
    buttonText: {
      today: 'Heute'
    },
    contentHeight: 'auto',
    expandRows: true,
    fixedWeekCount: false,
    showNonCurrentDates: false,
    dayMaxEventRows: true,
    dayMaxEvents: true,
    eventDisplay: 'block',
    events: [],
    eventClick: (info) => {
      const name = info.event.extendedProps['name'];
      const elementId = 'reservation-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    eventContent: (arg: any) => {
      const isMobile = window.innerWidth <= 400;
      return {
        html: isMobile ? this.formatNameMobile(arg.event.extendedProps.name) : this.formatName(arg.event.extendedProps.name)
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

  private formatName(name: string): string {
    const parts = name.split(' ');
    if (parts.length > 1) {
      if (parts[0].toLowerCase() === 'familie') {
        return name;
      }
      return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
    }
    return name;
  }

  private formatNameMobile(name: string): string {
    const parts = name.split(' ');
    if (parts.length > 1) {
      if (parts[0].toLowerCase() === 'familie') {
        return `F. ${parts.slice(1).join(' ')}`;
      }
      return `${parts[0][0]}. ${parts[1][0]}.`;
    }
    return name;
  }

  ngOnInit() {
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.calendarOptions = {
        ...this.calendarOptions,
        height: 'auto',
        contentHeight: 'auto',
        aspectRatio: 0.8
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reservations']) {
      this.updateEvents();
    }
  }

  private updateEvents() {
    const events = this.reservations.map(reservation => {
      const startDate = this.parseGermanDate(reservation.von);
      const endDate = this.parseGermanDate(reservation.bis);
      const colors = this.colorService.getColorForName(reservation.name);
      
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
        backgroundColor: colors.background,
        borderColor: colors.border,
        extendedProps: {
          name: reservation.name
        }
      };
    });

    this.calendarOptions.events = events;
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

  private updateCurrentMonth(date: Date) {
    const monthNames = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    this.currentMonthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
} 