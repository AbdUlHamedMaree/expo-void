/* eslint-disable @typescript-eslint/no-explicit-any */

import { TypedDocumentNode } from '@graphql-typed-document-node/core';

import { createApolloMutation } from './create-apollo-mutation';
import { createApolloQuery } from './create-apollo-query';
import type { Mutations, Queries } from './types';

export type CreateCRUDEntityReturn<
  TQueries extends readonly TypedDocumentNode<any, any>[],
  TMutations extends readonly TypedDocumentNode<any, any>[],
> = {
  readonly queries: Queries<TQueries>;
  readonly mutations: Mutations<TMutations>;
};

export const createApolloCRUDEntity =
  <TQueries extends readonly TypedDocumentNode<any, any>[]>(
    ...queriesDocuments: TQueries
  ) =>
  <TMutations extends readonly TypedDocumentNode<any, any>[]>(
    ...mutationsDocuments: TMutations
  ) => {
    const queriesKeys = queriesDocuments.map(
      document => (document.definitions[0] as any).name.value
    );

    const queriesHooks = queriesDocuments.map(document => createApolloQuery(document));

    const mutationHooks = mutationsDocuments.map(document =>
      createApolloMutation(document, {
        refetchQueries: queriesKeys,
      })
    );

    return {
      queries: queriesHooks,
      mutations: mutationHooks,
    } as CreateCRUDEntityReturn<TQueries, TMutations>;
  };
