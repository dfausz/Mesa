import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import CustomTheme from './components/custom-theme/custom-theme';
import { CssBaseline } from '@mui/material';


ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
        <CustomTheme>
          <CssBaseline />
          <App />
        </CustomTheme>
      </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
