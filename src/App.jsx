// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { Provider as AppBridgeProvider, useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { Redirect } from '@shopify/app-bridge/actions';
import { AppProvider as PolarisProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';
import { Pos, Cart, Group, Toast } from '@shopify/app-bridge/actions';
import StartPoint from './StartPoint';

export default function App() {
  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider
        config={{
          apiKey: process.env.SHOPIFY_API_KEY || '',
          host: new URL(location).searchParams.get('host'),
          forceRedirect: true,
        }}
      >
        <MyProvider>
          <StartPoint />
        </MyProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();
  const [isPOS, toggleIsPOS] = useState(false);
  app.featuresAvailable(Group.Pos).then(function (state) {
    var _ref = state.Pos && state.Pos[Pos.Action.CLOSE],
      Dispatch = _ref.Dispatch;
    toggleIsPOS(!!Dispatch);
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: 'include',
      fetch: userLoggedInFetch(app),
    }),
  });
  const ClonedChildren = React.cloneElement(children, { isPOS: isPOS });
  return <ApolloProvider client={client}>{ClonedChildren}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (response.headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
      const authUrlHeader = response.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url');

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
