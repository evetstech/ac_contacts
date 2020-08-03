import React, { FunctionComponent, useState, useCallback } from 'react';
import { HeaderObj } from './Header';
import './Row.scss';

export type RowObj = {
  [T: string]: any,
  name: string,
  value: string,
  location?: string,
  deals: number,
  tags?: string
  initials: string
};

type RowProps = {
  row: RowObj,
  columns: Array<HeaderObj>
};

const RowControl: FunctionComponent = () => {
  return (
    <>
      <p />
      <div className={'ctrl-btn-wrap'}>
        <div className={'inner-txt-before'}>Email</div>
        <span />
      </div>
    </>
  );
};

const Row: FunctionComponent<RowProps> = ({ row, columns }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onCheckboxClick = useCallback(() => {
    setIsSelected(prevState => !prevState);
  }, [setIsSelected]);
  return (
    <>
      <tr className={isSelected ? 'table-row-selected' : 'table-row'}>
        <td>
          <input type='checkbox' onClick={onCheckboxClick} />
        </td>
        {columns.map((column, index) => (
          <td key={index}>
            <div>
              {column.description === 'Contact' && <div className='circle-initials'>{row.initials && row.initials}</div>}
              {row[column.dataPath] && row[column.dataPath]}
              {index === columns.length - 1 && isSelected && <RowControl />}
            </div>
          </td>
        ))}
      </tr>
    </>
  );
};

export default Row;