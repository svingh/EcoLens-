// src/mocks/controllers.js
import { rest } from 'msw';
import { SewageDataMock, WastewaterDataMock } from './DataApiMocks';

export const controllers = [
    // Fetch Wastewater Data
    rest.get('/api/wastewater', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(WastewaterDataMock));
    }),

    // Fetch Sewage Data
    rest.get('/api/sewage', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(SewageDataMock));
    }),
];
