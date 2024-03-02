import {
  type NoInfer,
  type OperationVariables,
  useMutation,
  type MutationHookOptions,
  type DefaultContext,
  type ApolloCache,
  type MutationTuple,
} from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type CreateApolloMutationReturn<
  TData,
  TVariables extends OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>,
> = (
  options?: MutationHookOptions<NoInfer<TData>, NoInfer<TVariables>, TContext, TCache>
) => MutationTuple<TData, TVariables, TContext, TCache>;

export const createApolloMutation =
  <
    TData,
    TVariables extends OperationVariables,
    TContext = DefaultContext,
    TCache extends ApolloCache<any> = ApolloCache<any>,
  >(
    document: TypedDocumentNode<TData, TVariables>,
    baseOptions?: MutationHookOptions<
      NoInfer<TData>,
      NoInfer<TVariables>,
      TContext,
      TCache
    >
  ) =>
  (
    options?: MutationHookOptions<NoInfer<TData>, NoInfer<TVariables>, TContext, TCache>
  ) =>
    useMutation<TData, TVariables, TContext, TCache>(document, {
      ...baseOptions,
      ...options,
    });
