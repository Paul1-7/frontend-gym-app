import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes/MainRoutes';
import { Suspense } from 'react';
import { ScreenLoader } from './components';

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Suspense fallback={<ScreenLoader />}>
        <Router />
      </Suspense>
    </ThemeProvider>
  );
}
