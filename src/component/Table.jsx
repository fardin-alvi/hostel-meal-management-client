import React from 'react';

const Table = ({ columns, data, actions }) => {
    return (
        <div className="overflow-x-auto py-2">
            <table className="table max-w-2xl mx-auto rounded">
                <thead className="bg-white text-center">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-center">
                    {data?.map((row, rowIndex) => (
                        <tr key={row._id || rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {row[col.toLowerCase()] || '-'}
                                </td>
                            ))}
                            <td>
                                {actions?.map((action, actionIndex) => (
                                    <button
                                        key={actionIndex}
                                        onClick={() => action.onClick(row._id || row.mealId)}
                                        className={`btn-sm bg-purple-400 px-4 rounded-xl ${action.className}`}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
