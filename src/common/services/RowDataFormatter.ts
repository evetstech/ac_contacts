import { LooseObject } from '../../features/contacts/ContactSlice';
import { RowObj } from '../components/table/Row';

const getDealTotal = (dealIds: Array<number>, deals: LooseObject): string => {
  let currencyType: string = 'usd';
  let valueTotal: number = 0;

  dealIds.map((dealId: number, index: number) => {
    if (index === 0) {
      currencyType = deals[dealId].currency;
    }
    if (!isNaN(deals[dealId].value)) {
      valueTotal += parseInt(deals[dealId].value);
    }

    return dealId;
  });

  return new Intl.NumberFormat(currencyType, { style: 'currency', currency: currencyType, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(valueTotal);
};

const getTags = (tagIds: Array<number>, contactTags: LooseObject, tags: LooseObject): string => {
  let tagString = '';

  tagIds.map((tagId, index) => {
    tagString += `${tags[contactTags[tagId].tag].tag}`;

    if(index !== tagIds.length-1) {
      tagString += ', ';
    }

    return tagId;
  });

  return tagString;
};

//this is just going by the object example in the api docs, unsure if this will work with real data
const getLocation = (geoIpsIds: Array<number>, geoIps: Array<LooseObject>, geoAddresses: LooseObject): string => {
  let locationString = '';
  
  //assumption of having only 1 address, or if there is multiple you would only use the first one
  if(geoIpsIds[0]) {
    const geoAddress = geoAddresses[geoIps[0].id];
    locationString = `${geoAddress.city}, ${geoAddress.state}, ${geoAddress.country2}`;
  }

  return locationString;
};

// full name, currency type + total value of deals, number of deals, location, tags
const RowDataFormatter = (contacts: Array<LooseObject>, deals: LooseObject, tags: LooseObject, contactTags: LooseObject, geoIps: Array<LooseObject>, geoAddresses: LooseObject) => {
  const rows: Array<RowObj> = [];

  contacts.map(contact => {
    const dealCount: number = contact.deals.length;
    const valueTotal = getDealTotal(contact.deals, deals);
    const tagString = getTags(contact.contactTags, contactTags, tags);
    const location = getLocation(contact.geoIps, geoIps, geoAddresses);

    rows.push({
      name: (contact.firstName ? contact.firstName + ' ' : '') + (contact.lastName ? contact.lastName : ''),
      initials: (contact.firstName ? contact.firstName.charAt(0) : '?') + (contact.lastName ? contact.lastName.charAt(0) : '?'),
      value: valueTotal,
      deals: dealCount,
      location: location,
      tags: tagString
    });

    return contact;
  });

  return rows;
};

export default RowDataFormatter;