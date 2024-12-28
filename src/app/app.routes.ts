import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';

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
    path: '**',
    redirectTo: ''
  }
];
