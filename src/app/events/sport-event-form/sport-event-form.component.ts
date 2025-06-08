import {Component, effect, model, signal} from '@angular/core';
import {BaseEventFormComponent} from '../event-form-base/base-event-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseEvent} from '../event-form-base/base-event-form.model';
import {InputNumber} from 'primeng/inputnumber';

@Component({
  selector: 'un-sport-event-form',
  imports: [
    BaseEventFormComponent,
    ReactiveFormsModule,
    FormsModule,
    InputNumber
  ],
  templateUrl: './sport-event-form.component.html',
  styleUrl: './sport-event-form.component.scss',
  standalone: true
})
export class SportEventFormComponent {

  eventModel = model.required<BaseEvent>({});
  numberOfParticipants = signal(0);

  constructor() {
    effect(() => {
      this.eventModel.update(current => ({
        ...current,
        numberOfParticipants: this.numberOfParticipants() ?? 0
      }));
    });
  }

}
