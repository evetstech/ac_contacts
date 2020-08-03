import React from 'react';
import TextInput from './TextInput';
import { mount } from 'enzyme';

describe('text input', () => {
  it('should render with short value change', () => {
    const wrapper = mount(
      <TextInput text='test' />
    );
    wrapper.find({ type: 'text' }).simulate('change', { target: { value: 'asdf' } });

    expect(wrapper).toBeTruthy();
  });

  it('should render with long value change', () => {
    const wrapper = mount(
      <TextInput text='aklsjdflkasjdfkldjsdlkfjaskfjlskjsdlkfdsj' />
    );
    wrapper.find({ type: 'text' }).simulate('change', { target: { value: 'lkasjdflkajsdlkfjsldkfasdfasdfasdf' } });
    expect(wrapper).toBeTruthy();
  });

  it('should render focus', () => {
    const wrapper = mount(
      <TextInput text='asdf' />
    );
    wrapper.find({ type: 'text' }).simulate('focus');
    expect(wrapper).toBeTruthy();
  });

  it('should render error with blur', () => {
    const wrapper = mount(
      <TextInput text='asdf' error={true} />
    );
    wrapper.find({ type: 'text' }).simulate('blur');
    expect(wrapper).toBeTruthy();
  });
});