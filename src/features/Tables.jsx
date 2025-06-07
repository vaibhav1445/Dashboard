import React, { useMemo, useContext } from 'react';
import { useTable } from 'react-table';
import { ThemeContext } from '../context/ThemeContext';

const Tables = () => {
  const { darkMode } = useContext(ThemeContext);

  // Table Data
  const data = useMemo(() => [
    { col1: 'Hello', col2: 'World' },
    { col1: 'react-table', col2: 'rocks' },
    { col1: 'whatever', col2: 'you want' },
  ], []);

  // Table Columns
  const columns = useMemo(() => [
    { Header: 'Column 1', accessor: 'col1' },
    { Header: 'Column 2', accessor: 'col2' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className={`p-6 rounded-lg shadow-md transition-all duration-300 
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-1">Data Table</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A simple example using <code>react-table</code> for tabular data.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className={`w-full border-collapse text-sm 
            ${darkMode ? 'border border-gray-700' : 'border border-gray-300'}`}
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className={`p-3 text-left text-sm font-semibold tracking-wide 
                      ${darkMode ? 'border border-gray-700 text-white' : 'border border-gray-300 text-gray-900'}`}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className={`p-3 
                        ${darkMode ? 'border border-gray-700' : 'border border-gray-300'}`}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
