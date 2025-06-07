import {Component, effect, model, signal} from '@angular/core';
import {BaseEventFormComponent} from '../event-form-base/base-event-form.component';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseEvent} from '../event-form-base/base-event-form.model';

@Component({
  selector: 'un-musical-event-form',
  imports: [
    BaseEventFormComponent,
    InputText,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './musical-event-form.component.html',
  styleUrl: './musical-event-form.component.scss',
  standalone: true
})
export class MusicalEventFormComponent {

  eventModel = model.required<BaseEvent>({});
  kindOfMusic = signal('');

  constructor() {
    effect(() => {

      this.eventModel.update(current => ({
        ...current,
        kindOfMusic: this.kindOfMusic() ?? ''
      }));
    });
  }

}
