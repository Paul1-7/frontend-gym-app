import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilitiesConfigurator } from './utils/snackbar-manager.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          autoHideDuration={4000}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          preventDuplicate
        >
          <SnackbarUtilitiesConfigurator />
          <App />
        </SnackbarProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </HelmetProvider>
  // </React.StrictMode>
);
