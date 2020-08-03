import React from 'react';
import Table from './Table';
import { mount } from 'enzyme';

describe('Table', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table sortColumn='description' columns={[{ description: 'description', dataPath: 'name' }]} rows={[{ name: 'test', value: '$100', deals: 2, initials: 'SS' }]} />
    );

    expect(wrapper).toBeTruthy();
  });

  it('should render with no data', () => {
    const wrapper = mount(
      <Table sortColumn='Contact' columns={[{ description: 'Contact', dataPath: 'name' }]} rows={[]} />
    );
    expect(wrapper).toBeTruthy();
  });
});