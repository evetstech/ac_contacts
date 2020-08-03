import React from 'react';
import Contacts from './Contacts';
import { mount } from 'enzyme';
import { store } from '../../app/store';
import { Provider } from 'react-redux';

describe('contacts page', () => {
  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Contacts />
      </Provider>
    );
  });
});