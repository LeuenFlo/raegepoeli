import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  mainImage: string = '';
  images: string[] = [];

  mapUrl = 'https://maps.app.goo.gl/n8nbnT8XYyoZy98X7';
  
  address = {
    street: 'Wanneggweg 12',
    city: '3715 Adelboden'
  };

  contact = {
    intro: 'Für eine Reservierungsanfrage kontaktieren Sie bitte Frau XY:',
    email: 'xy@example.com',
    phone: '+41 12 345 67 89',
    whatsapp: '+41123456789'
  };

  prices = {
    base: 85,
    perPerson: 20
  };

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.loadImages();
  }

  private loadImages() {
    this.imageService.getImages().subscribe(images => {
      this.images = images;
      if (this.images.length > 0) {
        this.mainImage = this.images[0];
      }
    });
  }

  changeMainImage(image: string) {
    this.mainImage = image;
  }
} 
