import {Injectable, InjectionToken, signal, WritableSignal} from '@angular/core';
import {BaseEvent} from './event-form-base/base-event-form.model';

export const EVENT_FORM_MODEL = new InjectionToken<WritableSignal<BaseEvent>>('EVENT_FORM_MODEL');

@Injectable({providedIn: 'root'})
export class EventService {

  events = signal<BaseEvent[]>([]);
  currentId = signal<number>(0);

  addEvent(event: BaseEvent) {
    this.currentId.update(id => id + 1);

    this.events.update(events => [
      ...events,
      {
        ...event,
        id: this.currentId()
      }
    ]);
  }

  updateEvent(updatedEvent: BaseEvent) {
    this.events.update(events =>
      events.map(event => event.id === updatedEvent.id ? updatedEvent : event)
    );
  }

  deleteEvent(id: number) {
    this.events.update(events => events.filter(event => event.id !== id));
  }
}
