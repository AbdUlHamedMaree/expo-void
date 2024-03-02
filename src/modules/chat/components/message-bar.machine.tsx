import type { Audio } from 'expo-av';
import { assign, createActor, setup } from 'xstate';

type Machine = {
  tags: 'show-send' | 'record-input';
  context: {
    recording: Audio.Recording | null;
    sound: Audio.Sound | null;
    uri: string | null;
    meters: number[];
    duration: string | null;
    text: string;
    soundStatus: 'playing' | 'paused';
  };
  events:
    | { type: 'text.typing'; text: string }
    | { type: 'text.erase' }
    | { type: 'record.start'; recording: Audio.Recording }
    | { type: 'record.end'; sound: Audio.Sound; uri: string }
    | { type: 'record.meters.add'; meter: number }
    | { type: 'record.duration.set'; duration: string }
    | { type: 'record.sound.start' }
    | { type: 'record.sound.pause' }
    | { type: 'record.sound.stop' }
    | { type: 'record.cancel' }
    | { type: 'send' };
};

const getInitialState = (): Machine['context'] => ({
  recording: null,
  sound: null,
  uri: null,
  meters: [],
  duration: null,
  text: '',
  soundStatus: 'paused',
});

export const messageMachine = setup({
  types: {} as Machine,
}).createMachine({
  id: 'fetch',
  initial: 'idle',
  context: getInitialState(),
  states: {
    idle: {
      entry: assign(getInitialState()),
      on: {
        'record.start': {
          target: 'recording',
          actions: assign({
            recording: ({ event }) => event.recording,
          }),
        },
        'text.typing': {
          target: 'texting',
          actions: assign({
            text: ({ event }) => event.text,
          }),
        },
      },
    },
    texting: {
      tags: ['show-send'],
      on: {
        'text.typing': {
          actions: assign({
            text: ({ event }) => event.text,
          }),
        },
        'text.erase': {
          target: 'idle',
          actions: assign({
            text: '',
          }),
        },
        'send': {
          target: 'idle',
          actions: [{ type: 'send' }],
        },
      },
    },
    recording: {
      tags: ['record-input'],
      on: {
        'record.end': {
          target: 'finished',
          actions: assign({
            sound: ({ event }) => event.sound,
            uri: ({ event }) => event.uri,
          }),
        },
        'record.meters.add': {
          actions: assign({
            meters: ({ context, event }) => [...context.meters, event.meter],
          }),
        },
        'record.duration.set': {
          actions: assign({
            duration: ({ event }) => event.duration,
          }),
        },
      },
    },
    finished: {
      tags: ['show-send', 'record-input'],
      on: {
        'record.sound.start': {
          actions: assign({
            soundStatus: 'playing',
          }),
        },
        'record.sound.pause': {
          actions: assign({
            soundStatus: 'paused',
          }),
        },
        'send': 'idle',
        'record.cancel': 'idle',
      },
    },
  },
});

export const messagesActor = createActor(messageMachine);
