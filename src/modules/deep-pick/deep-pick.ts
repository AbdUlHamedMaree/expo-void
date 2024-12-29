import { Primitive, UnionKeyOf } from 'ts-typetools';

import { DeepPickGrammar, DefaultGrammar } from './deep-pick-grammar';
import { DeepPickPath } from './deep-pick-path';
import { Opaque } from './opaque';

export type DeepPick<
  T,
  K extends DeepPickPath<T, G>,
  G extends DeepPickGrammar = DefaultGrammar,
> = T extends Opaque
  ? T
  : T extends Primitive
    ? T
    : T extends (infer Item)[]
      ? DeepPick<Item, ArrayItemKey<K, G>, G>[]
      : [K] extends [G['glob']]
        ? T
        : Rename<
            ShouldPick<K, G> extends true
              ? Pick<InnerPick<T, K, G>, PickOuterKey<K, G> & UnionKeyOf<T>>
              : ShouldOmit<K, G> extends true
                ? Omit<InnerPick<T, K, G>, OmitOuterKey<K, G>>
                : InnerPick<T, K, G>,
            T
          >;

type ArrayItemKey<K extends string, G extends DeepPickGrammar> = InnerKey<
  G['array'],
  K,
  G
>;

type InnerPick<T, K extends DeepPickPath<T, G>, G extends DeepPickGrammar> = {
  [key in UnionKeyOf<T>]: DeepPick<T[key], InnerKey<key, K, G>, G>;
};

type InnerKey<key extends string, K, G extends DeepPickGrammar> = [
  Extract<K, `${Empty | G['mutate']}${key}${G['prop']}${string}`>,
] extends [`${Empty | G['mutate']}${key}${G['prop']}${infer K}`]
  ? K
  : never;

type ShouldPick<K extends string, G extends DeepPickGrammar> = [
  ExcludeMutateKey<ExcludeOmitKey<K, G>, G>,
] extends [G['glob']] | [never]
  ? false
  : true;

type ShouldOmit<K extends string, G extends DeepPickGrammar> = [
  Extract<K, `${G['mutate']}${string}`>,
] extends [string]
  ? true
  : false;

type PickOuterKey<K extends string, G extends DeepPickGrammar> = Exclude<
  StripMutateKey<ExcludeOmitKey<KeyHead<K, G>, G>, G>,
  OmitOuterKey<K, G>
>;

type OmitOuterKey<K extends string, G extends DeepPickGrammar> = ExtractOmitKey<
  KeyHead<K, G>,
  G
>;

type ExcludeOmitKey<K extends string, G extends DeepPickGrammar> = Exclude<
  K,
  `${G['omit']}${string}`
>;

type ExtractOmitKey<
  K extends string,
  G extends DeepPickGrammar,
> = K extends `${G['omit']}${infer K}` ? K : never;

type ExcludeMutateKey<K extends string, G extends DeepPickGrammar> = Exclude<
  K,
  `${G['mutate']}${string}`
>;

type StripMutateKey<
  K extends string,
  G extends DeepPickGrammar,
> = K extends `${G['mutate']}${infer K}` ? K : K;

type KeyHead<
  K extends string,
  G extends DeepPickGrammar,
> = K extends `${infer K}${G['prop']}${string}` ? K : K;

type Empty = '';

type Rename<T, Alias> = T extends Alias ? (Alias extends T ? Alias : T) : T;

type A = { a?: string };

type B = InnerPick<A, 'a', DefaultGrammar>;
