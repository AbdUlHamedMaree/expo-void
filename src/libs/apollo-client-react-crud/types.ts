/* eslint-disable @typescript-eslint/no-explicit-any */

import type { OperationVariables } from '@apollo/client';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

import type { CreateApolloMutationReturn } from './create-apollo-mutation';
import type { CreateApolloQueryReturn } from './create-apollo-query';

type QueriesInternal<
  TQueries extends readonly TypedDocumentNode<any, any>[],
  Index extends number[],
  TResult extends CreateApolloQueryReturn<any, any>[],
> = Index['length'] extends TQueries['length']
  ? TResult
  : QueriesInternal<
      TQueries,
      [...Index, 0],
      [
        ...TResult,
        TQueries[Index['length']] extends TypedDocumentNode<infer TData, infer TVariables>
          ? CreateApolloQueryReturn<TData, TVariables & OperationVariables>
          : never,
      ]
    >;

export type Queries<TQueries extends readonly TypedDocumentNode<any, any>[]> =
  QueriesInternal<TQueries, [], []>;

type MutationsInternal<
  TMutations extends readonly TypedDocumentNode<any, any>[],
  Index extends number[],
  TResult extends CreateApolloMutationReturn<any, any>[],
> = Index['length'] extends TMutations['length']
  ? TResult
  : MutationsInternal<
      TMutations,
      [...Index, 0],
      [
        ...TResult,
        TMutations[Index['length']] extends TypedDocumentNode<
          infer TData,
          infer TVariables
        >
          ? CreateApolloMutationReturn<TData, TVariables & OperationVariables>
          : never,
      ]
    >;

export type Mutations<TMutations extends readonly TypedDocumentNode<any, any>[]> =
  MutationsInternal<TMutations, [], []>;
