import React from 'react';
import ReactDOM from 'react-dom/client';
import { VisibilityProvider } from './providers/VisibilityProvider';
import { Provider } from 'react-redux';
import { minigamesStore } from './store/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VisibilityProvider>
      <Provider store={minigamesStore}>
        <App />
      </Provider>
    </VisibilityProvider>
  </React.StrictMode>
);
