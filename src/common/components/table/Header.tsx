import React, { FunctionComponent } from 'react';
import './Header.scss';

export type HeaderObj = {
  description: string,
  dataPath: string
};

type HeaderProps = {
  columns: Array<HeaderObj>,
  sortColumn: string
};

const Header: FunctionComponent<HeaderProps> = ({ columns, sortColumn }) => {
  return (
    <>
      <tr className='header-row'>
        <th><input type='checkbox' disabled={true} /></th>
        {columns.map((column, index) => (
          <th key={index}>
            <div>
              {column.description}
              {column.description === sortColumn && <div className='arrow-down' />}
              {index === columns.length - 1 && <span>&#x25a0; &#x25a0; &#x25a0;</span>}
            </div>
          </th>
        ))}
      </tr>
    </>
  );
};

export default Header;