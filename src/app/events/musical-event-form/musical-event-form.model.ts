import {BaseEvent, EventType} from '../event-form-base/base-event-form.model';

export class MusicEvent extends BaseEvent{
  kindOfMusic: string = '';

  constructor() {
    super();
    this.eventType = EventType.Musical;
  }
}
