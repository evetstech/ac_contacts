import { FetchGet } from './Fetch';

jest.mock('axios', () => {
  return {
    get: async (endpoint: string, options?: object) => {
      if (endpoint && options) {
        return { hello: 'hi' };
      } else {
        return { bye: 'bye' };
      }
    }
  };
});

describe('fetch', () => {
  it('should fetch', async () => {
    const result = await FetchGet('test', 'apiUrl');

    expect(result).toEqual({ hello: 'hi' });
  });

  it('should fetch', async () => {
    const result = await FetchGet('test');

    expect(result).toEqual({ hello: 'hi' });
  });
});