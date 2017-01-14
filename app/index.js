import { render } from 'react-dom';

import './assets/styles/index.css';

import AppRouter from './routers/AppRouter';

render(
    AppRouter,
    document.getElementById('app')
);
