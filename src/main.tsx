import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n/config';
import './styles/globals.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root container in index.html');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
