import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '../public/styles/global.scss';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/lesser-dark.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/colorforth.css';
import 'codemirror/theme/dracula.css';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);