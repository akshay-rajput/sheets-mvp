import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import FormatRules from "../features/FormatCells/FormatRules";
import DataTable from "../features/Table/DataTable";

export default function Home() {
    const { data } = useSelector((state) => state.sheetData);

    const memoData = useMemo(() => {
        let properData = [];

        let allSites = Object.keys(data);
        allSites.forEach((siteName) => {
            let siteObj = {};
            siteObj.name = siteName;

            siteObj = { ...siteObj, ...data[siteName] };
            properData.push(siteObj);
        });
        // console.log({properData});
        return properData;
    }, [data]);

    const memoColumns = React.useMemo(
        () => [
            {
                // expander column
                id: "expander",
                Header: "",
                Cell: ({ row }) =>
                    // to build the toggle for expanding a row
                    row.canExpand ? (
                        <span
                            {...row.getToggleRowExpandedProps({
                                style: {
                                    // We can even use the row.depth property
                                    // and paddingLeft to indicate the depth
                                    // of the row
                                    paddingLeft: `${row.depth * 2}rem`,
                                },
                            })}
                        >
                            {row.isExpanded ? "👇" : "👉"}
                        </span>
                    ) : null,
            },
            {
                Header: "Site",
                accessor: "name", // accessor is the "key" in the data
                sortType: "basic",
            },
            {
                Header: "Load time",
                accessor: "loadTime",
                sortType: "basic",
            },
            {
                Header: "Type",
                accessor: "type",
                sortType: "basic",
            },
            {
                Header: "Address",
                accessor: "address",
            },
        ],
        []
    );

    return (
        <div className="grid grid-cols-4 gap-4 md:gap-8">
            <div className="row-start-2 md:row-start-auto col-span-4 md:col-span-1 py-4">
                <FormatRules />
            </div>

            <div className="col-span-4 md:col-span-3 mt-8 py-4">
                <h2 className="text-lg font-semibold py-2">
                    Website load times
                </h2>
                <small className="text-gray-400 block mb-2 text-right">
                    *Click on table header to sort by that field
                </small>
                <DataTable data={memoData} columns={memoColumns} />
            </div>
        </div>
    );
}
