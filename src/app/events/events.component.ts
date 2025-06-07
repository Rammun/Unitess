import {Component, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {CreateEventModalComponent} from './create-event=modal/create-event-modal.component';
import {BaseEvent} from './event-form-base/base-event-form.model';
import {EventService} from './events.service';

@Component({
  selector: 'un-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [
    TableModule,
    Button,
    CreateEventModalComponent
  ]
})
export class EventsComponent {

  @ViewChild('createEventModal') createEventModal!: CreateEventModalComponent;

  get events() {
    return this._eventsService.events;
  }

  constructor(
    private readonly _eventsService: EventService
  ) {
  }

  trackBy(event: BaseEvent) {
    return event.id;
  }

  onCreateNewEvent() {
    this.createEventModal.show();
  }

  onViewEvent(event: BaseEvent) {

  }

  onEditEvent(event: BaseEvent) {

  }

  onDeleteEvent(event: BaseEvent) {

  }

}
