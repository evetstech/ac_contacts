import React from 'react';
import Button from './Button';
import { mount } from 'enzyme';

describe('button', () => {
  it('should render', () => {
    const wrapper = mount(
      <Button />
    );

    expect(wrapper).toBeTruthy();
  });
  it('should render loading', () => {
    const wrapper = mount(
      <Button loadingStatus={1} />
    );

    expect(wrapper).toBeTruthy();
  });
});