import React from "react";
import { useTable, useExpanded, useSortBy } from "react-table";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import checkIfRuleApplicable from "../../utils/checkIfRuleApplicable";

export default function DataTable({ data, columns }) {
    const { rules } = useSelector((state) => state.sheetData);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { expanded },
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
        useExpanded // Use the useExpanded plugin hook
    );

    return (
        <div className="overflow-x-auto">
            <table {...getTableProps}>
                <thead>
                    {headerGroups.map((headerGroup) => {
                        return (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps()
                                        )}
                                        className="py-2 px-4 border text-left border-gray-600 font-semibold text-gray-400"
                                    >
                                        {
                                            // Render the header
                                            column.render("Header")
                                        }
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <span className="text-gray-600"> ▼</span>
                                                    : <span className="text-gray-600"> ▲</span>
                                                : ""}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        );
                    })}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row); // for display
                        return (
                            <tr
                                {...row.getRowProps()}
                                className={"hover:bg-gray-900 cursor-default "}
                                key={uuidv4()}
                            >
                                {row.cells.map((cell) => {
                                    // apply cell prop
                                    return (
                                        <td
                                            className={
                                                "py-2 px-4 border border-gray-600" +
                                                ` bg-${checkIfRuleApplicable(
                                                    rules,
                                                    cell.value,
                                                    cell.column.Header
                                                )}-700`
                                            }
                                            key={uuidv4()}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
