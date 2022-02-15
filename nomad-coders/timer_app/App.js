import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Timer from './src/components/Timer';
import reducer from './src/reducer';

const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <Timer />
    </Provider>
  );
}
