import React from 'react';
import { render } from 'react-dom';
import Home from './scenes/Home';

import './styles/reset.scss';
import './styles/bootstrap.min.css';
import './styles/page.scss';

const target = document.getElementById('root');
render(<Home />, target);
