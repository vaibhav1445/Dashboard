import React, { useMemo, useState, useContext } from "react";
import { useTable, useRowSelect } from "react-table";
import { ThemeContext } from "../context/ThemeContext";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="bg-transparent border-none outline-none w-full p-1"
    />
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

const Tables = () => {
  const { darkMode } = useContext(ThemeContext);

  const [data, setData] = useState([]);

  const [newRow, setNewRow] = useState({ col1: "", col2: "" });

  const updateMyData = (rowIndex, columnId, value) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const handleDelete = (row) => {
    setData((old) => old.filter((r) => r !== row));
  };

  const handleEdit = (row) => {
    alert(`Edit row: ${JSON.stringify(row)}`);
  };

  const exportToCSV = (rows) => {
    if (!rows.length) return;
    const header = Object.keys(rows[0].original).join(",");
    const csvRows = rows.map((r) =>
      Object.values(r.original)
        .map((val) => `"${val}"`)
        .join(",")
    );
    const csv = [header, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table-data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRow = () => {
    if (newRow.col1.trim() === "" || newRow.col2.trim() === "") {
      alert("Please fill both columns");
      return;
    }
    setData((old) => [...old, newRow]);
    setNewRow({ col1: "", col2: "" });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    { columns, data, defaultColumn, updateMyData },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((cols) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...cols,
      ]);
    }
  );

  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Data Table</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Editable table with selection, actions, export, and add row.
          </p>
        </div>

        <button
          onClick={() => exportToCSV(selectedFlatRows)}
          disabled={Object.keys(selectedRowIds).length === 0}
          className="px-4 py-2 rounded bg-indigo-600 text-white disabled:bg-gray-400"
        >
          Export Selected ({Object.keys(selectedRowIds).length})
        </button>
      </div>

      {/* Add Row Form */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          name="col1"
          value={newRow.col1}
          onChange={handleNewRowChange}
          placeholder="Column 1"
          className="p-2 border rounded flex-grow text-black"
        />
        <input
          name="col2"
          value={newRow.col2}
          onChange={handleNewRowChange}
          placeholder="Column 2"
          className="p-2 border rounded flex-grow text-black"
        />
        <button
          onClick={handleAddRow}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Row
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className={`w-full border-collapse text-sm ${
            darkMode ? "border border-gray-700" : "border border-gray-300"
          }`}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={`p-3 text-left text-sm font-semibold tracking-wide ${
                      darkMode
                        ? "border border-gray-700 text-white"
                        : "border border-gray-300 text-gray-900"
                    }`}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={`p-3 ${
                        darkMode ? "border border-gray-700" : "border border-gray-300"
                      }`}
                    >
                      {cell.render("Cell")}
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
