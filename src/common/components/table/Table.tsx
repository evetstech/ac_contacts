import React, { FunctionComponent } from 'react';
import Header, { HeaderObj } from './Header';
import Row, { RowObj } from './Row';
import './Table.scss';

type TableProps = {
  columns: Array<HeaderObj>,
  rows: Array<RowObj>,
  sortColumn: string
};

const Table: FunctionComponent<TableProps> = ({ columns, rows, sortColumn }) => {
  return (
    <table className='table'>
      <thead className='thead'>
        <Header sortColumn={sortColumn} columns={columns} />
      </thead>
      <tbody>
        {rows.length > 0 ? rows.map((row, index) => <Row key={index} columns={columns} row={row} />)
        : <tr><td style={{textAlign:'center', height: '46px'}}colSpan={6}>No Data Available</td></tr>}
      </tbody>
    </table>
  );
};

export default Table;