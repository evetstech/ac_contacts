import React, { FunctionComponent } from 'react';
import './App.scss';
import Contacts from './features/contacts/Contacts';

const App: FunctionComponent = () => {
  return (
    <div className='top-level-wrapper'>
      <Contacts />
    </div>
  );
}

export default App;
