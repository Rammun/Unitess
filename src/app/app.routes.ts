import {Routes} from '@angular/router';
import {EventsComponent} from './events/events.component';
import {EventViewComponent} from './event-view/event-view.component';

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
  {
    path: 'events/:id',
    component: EventViewComponent
  },
  {
    path: '**',
    redirectTo: '/events'
  }
];
