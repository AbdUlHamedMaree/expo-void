export const $Opaque = Symbol('Opaque');

export interface Opaque {
  [$Opaque]?: never;
}
