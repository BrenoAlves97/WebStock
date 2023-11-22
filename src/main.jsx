import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app.jsx';

import { register } from 'swiper/element/bundle';

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
