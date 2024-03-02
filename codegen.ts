import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema:
    process.env.EXPO_PUBLIC_API_HTTP_PROTOCOL +
    '//' +
    process.env.EXPO_PUBLIC_API_HOST +
    process.env.EXPO_PUBLIC_API_GRAPHQL_PATHNAME,
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  hooks: { afterAllFileWrite: ['eslint --fix'] },
  ignoreNoDocuments: true,
};

export default config;
