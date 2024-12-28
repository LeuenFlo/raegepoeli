import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Reservation } from '../../models/reservation.model';
import { ColorService } from '../../services/color.service';

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
    locale: 'de',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    height: 'auto',
    contentHeight: 'auto',
    expandRows: true,
    events: [],
    eventContent: (arg: any) => {
      return {
        html: this.formatName(arg.event.extendedProps.name)
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