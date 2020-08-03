import React, { FunctionComponent } from 'react';
import './Button.scss';
import { FetchState } from '../../../features/contacts/ContactSlice';

type ButtonProps = {
  text?: string,
  loadingStatus?: FetchState,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
};

const Button: FunctionComponent<ButtonProps> = ({text, loadingStatus, onClick = () => {}}) => {
  return (
    <button className='btn' onClick={onClick} disabled={loadingStatus === FetchState.Fetching}>
      {loadingStatus !== FetchState.Fetching ? text :  <span/>}
    </button>
  );
};

export default Button;