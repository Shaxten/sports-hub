import { useEffect, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender
} from "@tanstack/react-table";

import type { SortingState } from "@tanstack/react-table";

type Player = {
  playerId: number;
  firstName: string;
  lastName: string ;
  teamAbbrev: string;
  goals: number;
  assists: number;
  points: number;
};

export default function Players() {
  const [data, setData] = useState<Player[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
axios.get("/api/nhl-stats").then((res) => {
  setData(res.data);
});
  }, []);

  const columns = [
    {
      header: "Player",
      accessorFn: (row: Player) => `${row.firstName} ${row.lastName}`,
    },
    { header: "Team", accessorKey: "teamAbbrev" },
    { header: "Goals", accessorKey: "goals" },
    { header: "Assists", accessorKey: "assists" },
    { header: "Points", accessorKey: "points" },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="border-collapse border w-full text-left">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="cursor-pointer border p-2"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}