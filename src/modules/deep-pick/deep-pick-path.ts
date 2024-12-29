import { Primitive, UnionKeyOf } from 'ts-typetools';

import { DeepPickGrammar, DefaultGrammar } from './deep-pick-grammar';
import { Opaque } from './opaque';

export type DeepPickPath<T, G extends DeepPickGrammar = DefaultGrammar> = (
  | (T extends Opaque
      ? never
      : T extends Primitive
        ? never
        : T extends (infer T)[]
          ? T extends Primitive
            ? never
            : InnerKey<T, G['array'], G>
          :
              | { [key in KeyOf<T>]: key | InnerKey<T[key], key, G> }[KeyOf<T>]
              | OmitKey<T, G>)
  | G['glob']
) &
  string;

type InnerKey<T, key extends string, G extends DeepPickGrammar, R = never> = (
  T extends Opaque
    ? never
    : T extends R
      ? never
      : T extends Primitive
        ? never
        : T extends (infer T)[]
          ? T extends Primitive
            ? never
            : `${key}${G['prop']}${InnerKey<T, G['array'], G, R> & string}`
          :
              | {
                  [key2 in KeyOf<T>]:
                    | `${key}${G['prop']}${key2}`
                    | `${key}${G['prop']}${InnerKey<T[key2], key2, G, R | T[key2]> & string}`;
                }[KeyOf<T>]
              | `${key}${G['prop']}${OmitKey<T, G>}`
) extends infer Key
  ? Key | `${G['mutate']}${Key & string}`
  : never;

type OmitKey<T, G extends DeepPickGrammar> = {
  [key in KeyOf<T>]: `${G['omit']}${key}`;
}[KeyOf<T>];

type KeyOf<T> = UnionKeyOf<T> & string;
