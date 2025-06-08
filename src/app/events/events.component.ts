import {Component, DestroyRef, inject, viewChild, ViewChild} from '@angular/core';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {EditEventModalComponent} from './edit-event-modal/edit-event-modal.component';
import {BaseEvent} from './event-form-base/base-event-form.model';
import {EventService} from './events.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, EMPTY} from 'rxjs';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'un-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  imports: [
    TableModule,
    Button,
    EditEventModalComponent,
    Toast,
    DatePipe,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class EventsComponent {

  editEventModal = viewChild.required(EditEventModalComponent);

  get events() {
    return this._eventsService.events;
  }

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly _eventsService: EventService,
    private readonly _messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly _router: Router
  ) {
  }

  trackBy(event: BaseEvent) {
    return event.id;
  }

  onShowNewEventModal() {
    this.editEventModal().show();
  }

  onShowEditEventModal(event: BaseEvent) {
    this.editEventModal().show(event);
  }

  onViewEvent(event: BaseEvent) {
    this._router.navigate([`/events`, event.id]);
  }

  onDeleteEvent($event: Event, event: BaseEvent) {
    this.confirmDeletion($event, event.id);
  }

  onSaved() {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'event saved'
    });
  }

  private confirmDeletion($event: Event, eventId: number | null) {
    this.confirmationService.confirm({
      target: $event.target as EventTarget,
      message: `Are you sure that you want to delete event with id=${eventId}?`,
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
      },
      accept: () => {
        this.deleteEvent(eventId);
      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'not deleted'
        });
      },
    });
  }

  private deleteEvent(eventId: number | null) {
    this._eventsService.deleteEvent(eventId)
      .pipe(
        catchError(err => {
          console.log(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'not deleted'
          });
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `event id=${eventId} has been deleted`
        });
      })
  }

}
