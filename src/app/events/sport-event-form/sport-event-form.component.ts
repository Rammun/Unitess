import {ChangeDetectionStrategy, Component, effect, model, signal} from '@angular/core';
import {BaseEventFormComponent} from '../event-form-base/base-event-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseEvent, EventFormConstants} from '../event-form-base/base-event-form.model';
import {InputNumber} from 'primeng/inputnumber';
import {SportEvent} from './sport-event-form.model';

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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SportEventFormComponent {

  eventModel = model.required<BaseEvent>({});
  numberOfParticipants = signal(0);

  protected readonly EventFormConstants = EventFormConstants;

  constructor() {
    effect(() => {
      const model = this.eventModel();
      this.numberOfParticipants.set((model as SportEvent).numberOfParticipants ?? '');
    });

    effect(() => {
      this.eventModel.update(current => ({
        ...current,
        numberOfParticipants: this.numberOfParticipants() ?? 0
      }));
    });
  }

}
