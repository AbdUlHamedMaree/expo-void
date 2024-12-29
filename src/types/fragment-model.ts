/* eslint-disable @typescript-eslint/no-explicit-any */

import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';

import type { FragmentType } from '$gql';

export type FragmentModel<TDocumentType extends DocumentTypeDecoration<any, any>> = Omit<
  Exclude<FragmentType<TDocumentType>[' $fragmentRefs'], undefined>[keyof Exclude<
    FragmentType<TDocumentType>[' $fragmentRefs'],
    undefined
  >],
  '__typename' | ' $fragmentName'
>;
