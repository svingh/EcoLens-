import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

async function initializeMocks() {
  if (process.env.REACT_APP_ENVIRONMENT === "test") {
    const { worker } = await import('./mocks/Browser');
    return worker.start();
  }
  return Promise.resolve();
}

initializeMocks().finally(() => {
  const renderApplication = () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  };

  renderApplication();
});
