import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: string[] = [];
  mainImage: string | null = null;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.loadImages();
  }

  private loadImages() {
    this.imageService.getImages().subscribe(images => {
      this.images = images;
      if (images.length > 0) {
        this.mainImage = images[0];
      }
    });
  }

  changeMainImage(image: string) {
    this.mainImage = image;
  }
} 