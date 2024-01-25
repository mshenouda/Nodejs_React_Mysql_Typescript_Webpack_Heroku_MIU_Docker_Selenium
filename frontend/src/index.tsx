import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const getCounter = () => {
  let count = 1;
  return () => count++;
};
const counter = getCounter();

const customPlain = (log: any) => `[${counter()}] ${log.message}`;
const customJSON = (log: any) => ({
  msg: log.message,
  count: counter(),
});

// const defaults = {
//     url: 'http://localhost:4000',
//     method: 'POST',
//     //credentials: 'include',
//     headers: {
//       "Access-Control-Allow-Origin":"*",
//       'Accept': 'application/json',
//       'Content-Type': 'application/json; charset=UTF-8'
//     },
//     token: '',
//     onUnauthorized: failedToken => {},
//     timeout: 0,
//     interval: 1000,
//     level: 'trace',
//     backoff: {
//       multiplier: 2,
//       jitter: 0.1,
//       limit: 30000,
//     },
//     capacity: 500,
//     stacktrace: {
//       levels: ['trace', 'warn', 'error', 'debug', 'info'],
//       depth: 3,
//       excess: 0,
//     },
//     timestamp: () => new Date().toISOString(),
//     format: remote.plain,
//   };
// //remote.apply(log, { format: customPlain });
// remote.apply(log, defaults);

// log.enableAll();
// log.info('Message one');
// log.info('Message two')


const root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement);
root.render(<App />);
// logger.emit({
//     timestamp: new Date(),
//     level: 'Information',
//     messageTemplate: 'Test logging from react'
// });

// <React.StrictMode>
//  render twice
// </React.StrictMode>