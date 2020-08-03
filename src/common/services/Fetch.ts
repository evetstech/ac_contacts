import axios from 'axios';

export const AC_ENDPOINT = 'https://sahmed93846.api-us1.com/api/3/contacts?include=contactTags.tag,deals,geoIps.geoAddress&limit=30';

export const FetchGet = async (apiKey: string, endpoint: string = AC_ENDPOINT) => {
  const result = await axios.get('https://cors-anywhere.herokuapp.com/' + endpoint, {
    headers: {
      'Api-Token': apiKey
    }
  });

  return result;
};