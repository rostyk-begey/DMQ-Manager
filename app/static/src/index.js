import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'app/root';

// global styles
import 'tabler-react/dist/Tabler.css';
import css from 'assets/styles/index.scss';

const el = document.getElementById('app');
ReactDOM.render(<Root />, el);
