export enum EventType {
  Sport = 'Sport',
  Musical = 'Musical',
  Unknown = 'Unknown',
}

export class BaseEvent {
  id: number | null = null;
  eventType: EventType = EventType.Unknown;
  name: string = '';
  location: string = '';
  description: string = '';
  createdDate: Date = new Date();
}

export class EventFormConstants {
  static readonly MAX_LENGTH = 100;
  static readonly MIN_NUMBER = 0;
  static readonly DESCRIPTION_MAX_LENGTH: 500;
}
