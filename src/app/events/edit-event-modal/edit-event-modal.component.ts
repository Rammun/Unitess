import {ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, output, signal} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {BaseEvent, EventType} from '../event-form-base/base-event-form.model';
import {Select} from 'primeng/select';
import {MusicalEventFormComponent} from '../musical-event-form/musical-event-form.component';
import {SportEventFormComponent} from '../sport-event-form/sport-event-form.component';
import {EventService} from '../events.service';
import {catchError, EMPTY, finalize} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BaseEventFormComponent} from '../event-form-base/base-event-form.component';

enum EventModalMode {
  CreateNew = 0,
  Edit = 1
}

type EventTypeOption = {
  label: string,
  value: EventType
};

@Component({
  selector: 'un-edit-event-modal',
  templateUrl: './edit-event-modal.component.html',
  styleUrl: './edit-event-modal.component.scss',
  imports: [
    Dialog,
    FormsModule,
    Button,
    Select,
    MusicalEventFormComponent,
    SportEventFormComponent,
    BaseEventFormComponent
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEventModalComponent {

  eventForm = signal<BaseEvent>(new BaseEvent());
  visible = signal<boolean>(false);
  eventTypes = signal<EventTypeOption[]>([
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
    return this.selectedEventType() == null;
  });
  eventModalMode = computed(() => !!this.eventForm().id ? EventModalMode.Edit : EventModalMode.CreateNew);
  isBusy = signal(false);
  saved = output();

  protected readonly EventType = EventType;
  protected readonly EventModalMode = EventModalMode;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly _eventService: EventService
  ) {
    effect(() => {
      this.eventForm.update(current => ({
        ...current,
        eventType: this.selectedEventType() ?? EventType.Unknown
      }))
    });
  }

  show(eventModel?: BaseEvent) {
    const model = eventModel ?? new BaseEvent();
    this.eventForm.set(model);
    this.selectedEventType.set(model.eventType ?? EventType.Unknown);
    this.isBusy.set(false);
    this.visible.set(true);
  }

  onClose() {
    this.visible.set(false);
  }

  onCreateEvent() {
    this.isBusy.set(true);
    this._eventService.createEvent(this.eventForm())
      .pipe(
        catchError(err => {
          console.log(err);
          return EMPTY;
        }),
        finalize(() => this.isBusy.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.saved.emit();
        this.onClose();
      });
  }

  onEditEvent() {
    this.isBusy.set(true);
    this._eventService.updateEvent(this.eventForm())
      .pipe(
        catchError(err => {
          console.log(err);
          return EMPTY;
        }),
        finalize(() => this.isBusy.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.saved.emit();
        this.onClose();
      });
  }

}
