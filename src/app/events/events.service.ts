import {Injectable, signal} from '@angular/core';
import {BaseEvent} from './event-form-base/base-event-form.model';
import {of, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventService {

  events = signal<BaseEvent[]>([]);
  currentId = signal<number>(0);

  getEventById(eventId: number) {
    if (!eventId) {
      return throwError(() => new Error('eventId is required'));
    }
    const event = this.events().find(event => event.id === eventId) ?? null;
    if (!event) {
      console.log('event is not found');
    }
    return of(event);
  }

  createEvent(event: BaseEvent) {
    if (!event) {
      return throwError(() => new Error('event is required'));
    }

    this.currentId.update(id => id + 1);

    this.events.update(events => [
      ...events,
      {
        ...event,
        id: this.currentId()
      }
    ]);

    return of(event);
  }

  updateEvent(event: BaseEvent) {
    if (!event) {
      return throwError(() => new Error('event is required'));
    }

    this.events.update(events =>
      events.map(item => item.id === event.id ? event : item)
    );

    return of(event);
  }

  deleteEvent(eventId: number | null = null) {
    if (!eventId) {
      return throwError(() => new Error('eventId is required'));
    }

    this.events.update(events => events.filter(event => event.id !== eventId));

    return of(true);
  }
}
