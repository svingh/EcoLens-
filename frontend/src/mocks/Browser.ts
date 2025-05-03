// src/mocks/browser.js
import { setupWorker } from 'msw';
import { controllers } from './controllers';

export const worker = setupWorker(...controllers);
