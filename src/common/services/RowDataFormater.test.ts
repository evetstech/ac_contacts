import RowDataFormatter from './RowDataFormatter';

describe('row data formatter', () => {
  const contacts = [{
    firstName: 'test',
    lastName: 'other',
    deals: ['1', '2'],
    contactTags: ['1', '2'],
    geoIps: []
  }];

  const deals = {
    1: { value: '100', currency: 'usd' },
    2: { value: '200', currency: 'usd' }
  };

  const contactTags = {
    1: { tag: '1' },
    2: { tag: '2' }
  }
  const tags = {
    1: { tag: 'test' },
    2: { tag: 'test2' }
  }

  it('should return formatted data', () => {
    const result = RowDataFormatter(contacts, deals, tags, contactTags, [{}], {} );

    expect(result[0]).toEqual({name: 'test other', initials: 'to', value: '$300', deals: 2, location: '', tags: 'test, test2'});
  });

  it('should return formatted data with location', () => {
    const contactsGeo = [{
      firstName: 'test',
      lastName: 'other',
      deals: ['1', '2'],
      contactTags: ['1', '2'],
      geoIps: ['1', '2']
    }];

    const geoIps = [
      { id: '1'},
      { id: '2'}
    ];
    
    const geoAddresses = {
      1: { city: 'Chicago', state: 'Illinois', country2: 'US'},
      2: { city: 'San Francisco', state: 'California', country2: 'US'}
    };

    const result = RowDataFormatter(contactsGeo, deals, tags, contactTags, geoIps, geoAddresses);

    expect(result[0]).toEqual({name: 'test other', initials: 'to', value: '$300', deals: 2, location: 'Chicago, Illinois, US', tags: 'test, test2'});
  });

  it('should return formatted data with deal value not being real', () => {
    const contactsGeo = [{
      deals: ['1', '2'],
      contactTags: ['1', '2'],
      geoIps: ['1', '2']
    }];

    const geoIps = [
      { id: '1'},
      { id: '2'}
    ];

    const deals = {
      1: { value: 'asdf', currency: 'usd' },
      2: { value: '200', currency: 'usd' }
    };

    const geoAddresses = {
      1: { city: 'Chicago', state: 'Illinois', country2: 'US'},
      2: { city: 'San Francisco', state: 'California', country2: 'US'}
    };

    const result = RowDataFormatter(contactsGeo, deals, tags, contactTags, geoIps, geoAddresses);

    expect(result[0]).toEqual({name: '', initials: '??', value: '$200', deals: 2, location: 'Chicago, Illinois, US', tags: 'test, test2'});
  });

  it('should return formatted data with no name', () => {
    const contactsGeo = [{
      deals: ['1', '2'],
      contactTags: ['1', '2'],
      geoIps: ['1', '2']
    }];

    const geoIps = [
      { id: '1'},
      { id: '2'}
    ];
    
    const geoAddresses = {
      1: { city: 'Chicago', state: 'Illinois', country2: 'US'},
      2: { city: 'San Francisco', state: 'California', country2: 'US'}
    };

    const result = RowDataFormatter(contactsGeo, deals, tags, contactTags, geoIps, geoAddresses);

    expect(result[0]).toEqual({name: '', initials: '??', value: '$300', deals: 2, location: 'Chicago, Illinois, US', tags: 'test, test2'});
  });

  it('should return formatted data no deals', () => {
    const contactsGeo = [{
      deals: [],
      contactTags: ['1', '2'],
      geoIps: ['1', '2']
    }];

    const geoIps = [
      { id: '1'},
      { id: '2'}
    ];
    
    const geoAddresses = {
      1: { city: 'Chicago', state: 'Illinois', country2: 'US'},
      2: { city: 'San Francisco', state: 'California', country2: 'US'}
    };

    const result = RowDataFormatter(contactsGeo, deals, tags, contactTags, geoIps, geoAddresses);

    expect(result[0]).toEqual({name: '', initials: '??', value: '$0', deals: 0, location: 'Chicago, Illinois, US', tags: 'test, test2'});
  });
});