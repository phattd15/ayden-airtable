"use client";

// AirtableLikeTable.tsx
import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';

interface Row {
  id: number;
  name: string;
  age: number;
  position: string;
}

const initialData: Row[] = [
  { id: 1, name: 'Alice', age: 25, position: 'Designer' },
  { id: 2, name: 'Bob', age: 30, position: 'Developer' },
  { id: 3, name: 'Charlie', age: 28, position: 'Manager' },
];

const BasePage = () => {
  const [data, setData] = useState(initialData);
  const [sorting, setSorting] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue, row, column }) => (
          <EditableCell
            value={getValue()}
            onUpdate={(value: string) =>
              updateCellValue(row.index, column.id, value)
            }
          />
        ),
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: ({ getValue, row, column }) => (
          <EditableCell
            value={getValue()}
            onUpdate={(value: number) =>
              updateCellValue(row.index, column.id, Number(value))
            }
          />
        ),
      },
      {
        accessorKey: 'position',
        header: 'Position',
        cell: ({ getValue, row, column }) => (
          <EditableCell
            value={getValue()}
            onUpdate={(value: string) =>
              updateCellValue(row.index, column.id, value)
            }
          />
        ),
      },
    ],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  function updateCellValue(rowIndex: number, columnId: string, value: any) {
    setData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .table-container {
          overflow-x: auto;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 10px 0;
          font-size: 14px;
        }
        th,
        td {
          padding: 8px 12px;
          border: 1px solid #ccc;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
          cursor: pointer;
        }
        th:hover {
          background-color: #eaeaea;
        }
        td {
          vertical-align: top;
        }
      `}</style>
    </div>
  );
};

interface EditableCellProps {
  value: any;
  onUpdate: (newValue: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  function handleBlur() {
    setIsEditing(false);
    if (inputValue !== value) {
      onUpdate(inputValue);
    }
  }

  return isEditing ? (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
};

export default BasePage;
