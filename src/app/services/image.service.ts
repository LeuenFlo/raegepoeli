import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface ImageList {
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImages(): Observable<string[]> {
    return this.http.get<ImageList>('assets/images/images.json').pipe(
      map(data => data.images.map(filename => `assets/images/${filename}`))
    );
  }
} 