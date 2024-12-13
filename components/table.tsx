// TableComponents.js
import React from "react";

interface TableWrapperProps {
  children: React.ReactNode;
}

export function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        {children}
      </table>
    </div>
  );
}


interface TableHeaderProps {
  headers: string[];
}

export function TableHeader({ headers }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}


interface TableRowProps {
  data: string[];
}

export function TableRow({ data }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      {data.map((cell, index) => (
        <td key={index} className="border border-gray-200 px-4 py-2">
          {cell}
        </td>
      ))}
    </tr>
  );
}
