import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import { UserProvider } from './contexts/UserContext';
import { HashRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { EventProvider } from './contexts/EventContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#fb8c00',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <EventProvider>
          <HashRouter>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </HashRouter>
        </EventProvider>
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
