import React from 'react';
import Row from './Row';
import { mount } from 'enzyme';

describe('row', () => {
  it('should render', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <Row columns={[{ description: 'description', dataPath: 'name' }]} row={{name: 'test', value: '$100', deals: 2, initials: 'SS'}} />
        </tbody>
      </table>
    );

    expect(wrapper).toBeTruthy();
  });

  it('should render with selected', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <Row columns={[{ description: 'Contact', dataPath: 'name' }]} row={{name: 'test', value: '$100', deals: 2, initials: 'SS'}} />
        </tbody>
      </table>
    );
    wrapper.find({type: 'checkbox'}).simulate('click');
    expect(wrapper).toBeTruthy();
  });
});