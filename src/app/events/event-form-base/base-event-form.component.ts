import {Component, effect, model, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseEvent} from './base-event-form.model';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'un-base-event-form',
  imports: [
    InputText,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './base-event-form.component.html',
  styleUrl: './base-event-form.component.scss',
  standalone: true
})
export class BaseEventFormComponent {

  eventModel = model.required<BaseEvent>({});
  name = signal('');
  description = signal('');
  location = signal('');

  constructor() {
    effect(() => {
      this.eventModel.update(current => ({
        ...current,
        name: this.name(),
        description: this.description(),
        location: this.location()
      }));
    });
  }
}
