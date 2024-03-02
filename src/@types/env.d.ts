declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_GOOGLE_SERVICES_API_KEY: string;

      EXPO_PUBLIC_API_HTTP_PROTOCOL: string;
      EXPO_PUBLIC_API_WS_PROTOCOL: string;
      EXPO_PUBLIC_API_HOST: string;
      EXPO_PUBLIC_API_GRAPHQL_PATHNAME: string;
    }
  }
}

export {};
