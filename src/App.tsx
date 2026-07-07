import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { router } from './router';
import { ScrollProgress } from './components/effects/ScrollProgress';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0A0E1A',
            color: '#E6F0FA',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#00FF92', secondary: '#0A0E1A' },
          },
          error: {
            iconTheme: { primary: '#F87171', secondary: '#0A0E1A' },
            style: {
              background: '#0A0E1A',
              color: '#FECACA',
              border: '1px solid rgba(248, 113, 113, 0.3)',
            },
          },
        }}
      />
      <Analytics />
    </>
  );
}
