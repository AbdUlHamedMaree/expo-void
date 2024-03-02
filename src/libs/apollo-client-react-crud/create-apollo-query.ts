import {
  useQuery,
  type QueryHookOptions,
  type NoInfer,
  type OperationVariables,
  type QueryResult,
} from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type CreateApolloQueryReturn<TData, TVariables extends OperationVariables> = (
  options?: QueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>
) => QueryResult<TData, TVariables>;

export const createApolloQuery =
  <TData, TVariables extends OperationVariables>(
    document: TypedDocumentNode<TData, TVariables>,
    baseOptions?: QueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>
  ) =>
  (options?: QueryHookOptions<NoInfer<TData>, NoInfer<TVariables>>) =>
    useQuery<TData, TVariables>(document, { ...baseOptions, ...options });
