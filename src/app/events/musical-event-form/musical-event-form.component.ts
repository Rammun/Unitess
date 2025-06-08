import {ChangeDetectionStrategy, Component, effect, model, signal} from '@angular/core';
import {BaseEventFormComponent} from '../event-form-base/base-event-form.component';
import {InputText} from 'primeng/inputtext';
import {InputNumberModule } from 'primeng/inputnumber';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseEvent, EventFormConstants} from '../event-form-base/base-event-form.model';
import {MusicEvent} from './musical-event-form.model';

@Component({
  selector: 'un-musical-event-form',
  imports: [
    BaseEventFormComponent,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule
  ],
  templateUrl: './musical-event-form.component.html',
  styleUrl: './musical-event-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicalEventFormComponent {

  eventModel = model.required<BaseEvent>({});
  kindOfMusic = signal('');

  protected readonly EventFormConstants = EventFormConstants;

  constructor() {
    effect(() => {
      const model = this.eventModel();
      this.kindOfMusic.set((model as MusicEvent).kindOfMusic ?? '');
    });

    effect(() => {
      this.eventModel.update(current => ({
        ...current,
        kindOfMusic: this.kindOfMusic() ?? ''
      }));
    });
  }

}
