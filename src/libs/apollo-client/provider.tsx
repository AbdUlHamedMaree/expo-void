import { ApolloProvider } from '@apollo/client';

import { apolloClient } from './client';

export const ApolloClientProvider: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
