import {BaseEvent, EventType} from '../event-form-base/base-event-form.model';

export class SportEvent extends BaseEvent {
  numberOfParticipants: number = 0;

  constructor() {
    super();
    this.eventType = EventType.Sport;
  }
}
