export interface Reservation {
    timestamp: string;
    name: string;
    personen: number;
    von: string;
    bis: string;
    checkout: string;
    telefon: string;
    status: 'angefragt' | 'bestätigt';
} 