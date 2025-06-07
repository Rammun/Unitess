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
