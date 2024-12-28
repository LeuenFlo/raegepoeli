import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    title: 'Chalet Rägepöli - Übersicht'
  },
  { 
    path: 'kontakt', 
    component: ContactComponent,
    title: 'Chalet Rägepöli - Kontakt & Preise'
  },
  { 
    path: 'galerie', 
    component: GalleryComponent,
    title: 'Chalet Rägepöli - Galerie'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
