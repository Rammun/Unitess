import {ChangeDetectionStrategy, Component, effect, model, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseEvent, EventFormConstants} from './base-event-form.model';
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseEventFormComponent {

  eventModel = model.required<BaseEvent>({});
  name = signal('');
  description = signal('');
  location = signal('');

  protected readonly EventFormConstants = EventFormConstants;

  constructor() {
    effect(() => {
      const model = this.eventModel();
      this.name.set(model.name ?? '');
      this.description.set(model.description ?? '');
      this.location.set(model.location ?? '');
    });

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
