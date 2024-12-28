import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/reservation.model';
import { ReservationService } from '../../services/reservation.service';

interface CurrentOccupancy {
  name: string;
  anzahl: number;
}

@Component({
  selector: 'app-current-occupancy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-occupancy.component.html',
  styleUrls: ['./current-occupancy.component.scss']
})
export class CurrentOccupancyComponent implements OnInit {
  currentOccupancy: CurrentOccupancy | null = null;

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.updateCurrentOccupancy();
  }

  private updateCurrentOccupancy() {
    this.reservationService.getCurrentReservation().subscribe(reservation => {
      if (reservation) {
        this.currentOccupancy = {
          name: reservation.name,
          anzahl: reservation.personen
        };
      } else {
        this.currentOccupancy = null;
      }
    });
  }
} 