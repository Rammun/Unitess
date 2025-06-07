import { Routes } from '@angular/router';
import {EventsComponent} from './events/events.component';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/events'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  // {
  //   path: 'events/:id',
  //   component: EventViewerComponent
  // },
  {
    path: '**',
    redirectTo: '/events'
  }
];
