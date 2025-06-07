import {Component, computed, effect, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {BaseEvent, EventType} from '../event-form-base/base-event-form.model';
import {Select} from 'primeng/select';
import {MusicalEventFormComponent} from '../musical-event-form/musical-event-form.component';
import {SportEventFormComponent} from '../sport-event-form/sport-event-form.component';
import {BaseEventFormComponent} from '../event-form-base/base-event-form.component';

@Component({
  selector: 'un-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.scss',
  imports: [
    Dialog,
    FormsModule,
    Button,
    Select,
    MusicalEventFormComponent,
    SportEventFormComponent,
    BaseEventFormComponent
  ],
  standalone: true
})
export class CreateEventModalComponent {

  EventType = EventType;

  eventForm = signal<BaseEvent>(new BaseEvent());
  visible = signal<boolean>(false);
  eventTypes = signal([
    {
      label: EventType.Musical,
      value: EventType.Musical
    },
    {
      label: EventType.Sport,
      value: EventType.Sport
    }
  ]);
  selectedEventType = signal<EventType | null>(null);
  isDisabled = computed(() => {
    return this.selectedEventType() === null;
  });

  constructor() {
    effect(() => {
      this.eventForm.update(current => ({
        ...current,
        eventType: this.selectedEventType() ?? EventType.Unknown
      }))
    });
  }

  show(eventModel?: BaseEvent) {
    this.eventForm.set(eventModel ?? new BaseEvent());
    this.visible.set(true);
  }

  close() {
    this.visible.set(false);
  }

  onSelectEventType(eventType: EventType) {
    console.log(eventType);
    this.selectedEventType.set(eventType);
  }

  onCreateEvent() {
    console.log('----', this.eventForm())
  }

}
