import React, { useMemo, ComponentType, useState, useCallback } from 'react';
import Table from '../../common/components/table/Table';
import Button from '../../common/components/button/Button';
import TextInput from '../../common/components/textinput/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { LooseObject, selectContacts, selectDeals, selectTags, selectContactTags, selectGeoIps, selectGeoAddresses, selectStatus, addContactsAsync } from './ContactSlice';
import { RowObj } from '../../common/components/table/Row';
import RowDataFormatter from '../../common/services/RowDataFormatter';
import './Contacts.scss';

type TableData = {
  readonly contacts: Array<LooseObject>,
  readonly deals: LooseObject,
  readonly tags: LooseObject,
  readonly contactTags: LooseObject,
  readonly geoIps: Array<LooseObject>,
  readonly geoAddresses: LooseObject
};

const Header = [
  { description: 'Contact', dataPath: 'name' },
  { description: 'Total Value', dataPath: 'value' },
  { description: 'Location', dataPath: 'location' },
  { description: 'Deals', dataPath: 'deals' },
  { description: 'Tags', dataPath: 'tags' }
];

export const withApiFetching = (Component: ComponentType<any>) => (props: any) => {
  const status = useSelector(selectStatus);
  const [apiToken, setApiToken] = useState('');
  const dispatch = useDispatch();

  const onTextChange = useCallback((value) => {
    setApiToken(value);
  }, [setApiToken]);

  const onSubmitApi = useCallback(() => {
    dispatch(addContactsAsync(apiToken));
  }, [apiToken, dispatch]);

  return (
    <>
      <div className='api-wrap'>
        <TextInput text={apiToken} onTextChange={onTextChange} placeholder='API Token' error={status === 3} disabled={status === 1} />
        <Button loadingStatus={status} text={'Submit'} onClick={onSubmitApi} />
      </div>
      <Component {...props} />
    </>
  )
};

export const withTableData = (Component: ComponentType<any>) => (props: any) => {
  const contacts = useSelector(selectContacts);
  const deals = useSelector(selectDeals);
  const tags = useSelector(selectTags);
  const contactTags = useSelector(selectContactTags);
  const geoIps = useSelector(selectGeoIps);
  const geoAddresses = useSelector(selectGeoAddresses);

  return (
    <Component contacts={contacts} deals={deals} tags={tags} contactTags={contactTags} geoIps={geoIps} geoAddresses={geoAddresses} {...props} />
  );
};

const Contacts: React.FC<TableData> = ({ contacts, deals, tags, contactTags, geoIps, geoAddresses }) => {
  // this is hardcoded for now since the pull on the API is sorted by contacts/asc
  // but if we were to implement sorting, around this area would be where we would implement the logic
  // const [sortIndicatorColumn, setSortIndicatorColumn] = useState();
  // const [sortDirection, setSortDirection] = useState('ASC');

  const rows: Array<RowObj> = useMemo(() =>
    RowDataFormatter(contacts, deals, tags, contactTags, geoIps, geoAddresses)
    , [contacts, deals, tags, contactTags, geoIps, geoAddresses]);

  return (
    <div className='contacts-top-wrap'>
      <Table sortColumn='Contact' columns={Header} rows={rows} />
    </div>
  );
};

export default withApiFetching(withTableData(Contacts));