import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { FetchGet } from '../../common/services/Fetch';

export enum FetchState {
  Idle,
  Fetching,
  Success,
  Error
};

//i was debating on writing an interface for each endpoint object, but decided against it;
//there shouldn't be a hard coupling of backend and front end.
interface ContactsData {
  tags: LooseObject,
  contactTags: LooseObject,
  deals: LooseObject,
  geoIps: Array<LooseObject>,
  geoAddresses: LooseObject,
  contacts: Array<LooseObject>
};

interface ContactState {
  contactsData: ContactsData,
  status: FetchState,
  errorMessage?: string
};

export interface LooseObject {
  [T: string]: any
};

const initialState: ContactState = {
  contactsData: {
    tags: {},
    contactTags: {},
    deals: {},
    geoIps: [],
    geoAddresses: {},
    contacts: []
  },
  status: FetchState.Idle
};

const mapIdToKey = (dataArray: Array<LooseObject>) => {
  const mappedObject: LooseObject = {};
  if(!dataArray) {
    return {};
  }

  dataArray.map(obj => {
    if(obj.id) {
      mappedObject[obj.id] = obj;
    }
    return obj;
  });
  
  return mappedObject;
}

// redux toolkit use immer by default.  there are tradeoffs between immer and immutable.js
export const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContactsData: (state, action: PayloadAction<ContactsData>) => {
      state.contactsData.tags = action.payload.tags;
      state.contactsData.contactTags = action.payload.contactTags;
      state.contactsData.deals = action.payload.deals;
      state.contactsData.geoIps = action.payload.geoIps;
      state.contactsData.geoAddresses = action.payload.geoAddresses;
      state.contactsData.contacts = action.payload.contacts;
    },
    setStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    }
  },
});

export const { addContactsData, setStatus, setErrorMessage } = ContactSlice.actions;

export const addContactsAsync = (apiKey: string, endpoint?: string): AppThunk => {
  return async dispatch => {
    dispatch(setStatus(FetchState.Fetching));
    
    try {
      //do fetch logic here
      const result = await FetchGet(apiKey, endpoint);
      if(result.status !== 200) {
        dispatch(setStatus(FetchState.Error));
        dispatch(setErrorMessage('There was an error retrieving contacts'));
      }
      const data = {
        geoIps: result.data.geoIps,
        geoAddresses: mapIdToKey(result.data.geoAddresses),
        contacts: result.data.contacts,
        deals: mapIdToKey(result.data.deals),
        tags: mapIdToKey(result.data.tags),
        contactTags: mapIdToKey(result.data.contactTags)
      };
      dispatch(setStatus(FetchState.Success));
      dispatch(addContactsData(data));
    } catch (error) {
      dispatch(setStatus(FetchState.Error));
      dispatch(setErrorMessage('Something went really bad!'));
      // console.error(error);
    }
  }
};

export const selectContacts = (state: RootState) => state.contact.contactsData.contacts;
export const selectDeals = (state: RootState) => state.contact.contactsData.deals;
export const selectTags = (state: RootState) => state.contact.contactsData.tags;
export const selectContactTags = (state: RootState) => state.contact.contactsData.contactTags;
export const selectGeoIps = (state: RootState) => state.contact.contactsData.geoIps;
export const selectGeoAddresses = (state: RootState) => state.contact.contactsData.geoAddresses;
export const selectStatus = (state: RootState) => state.contact.status;

export default ContactSlice.reducer;
