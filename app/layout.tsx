'use client';

import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux';
import store from '../store';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ApolloProvider client={client}>
        <Provider store={store}>
          <body className={inter.className}>{children}</body>
        </Provider>
      </ApolloProvider>
    </html>
  )
}
