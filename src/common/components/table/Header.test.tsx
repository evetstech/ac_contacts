import React from 'react';
import Header from './Header';
import { mount } from 'enzyme';

describe('header', () => {
  it('should render', () => {
    const wrapper = mount(
      <table>
        <thead>
          <Header columns={[{ description: 'description', dataPath: 'description' }]} sortColumn='description' />
        </thead>
      </table>
    );

    expect(wrapper).toBeTruthy();
  });
});