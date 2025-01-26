export enum TripStatusEnum {
  created = 'created',
  started = 'started',
  completed = 'completed',
}

export type TripStatusUnion = keyof typeof TripStatusEnum;
