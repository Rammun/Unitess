import {Component, DestroyRef, effect, inject, signal} from '@angular/core';
import {BaseEvent} from '../events/event-form-base/base-event-form.model';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../events/events.service';
import {catchError, EMPTY} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'un-event-view',
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.scss',
  imports: [
    KeyValuePipe
  ],
  standalone: true
})
export class EventViewComponent {

  eventId = signal<number | null>(null);
  eventView = signal(new BaseEvent());
  isNotFound = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _eventsService: EventService,
  ) {
    const eventId = this._activatedRoute.snapshot.params['id'];
    if (!!eventId) {
      this.eventId.set(Number(eventId));
    }

    effect(() => {
      const eventId = this.eventId();
      if (!eventId) {
        return;
      }
      this.getEvent(eventId);
    });
  }

  private getEvent(eventId: number) {
    this._eventsService.getEventById(eventId)
      .pipe(
        catchError(err => {
          console.log(err);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        if (!event) {
          this.isNotFound.set(true);
          return;
        }

        this.eventView.set(event);
      });
  }

}
