'use client';

import { useEffect, useState } from 'react';
import { getIconByName } from './Icons';
import Spinner from './Spinner';
import WalletAddressDisplay from './WalletAddressDisplay';
import { disabledHeaderTableNames } from './disabledHeaderTableNames';
import { TableData } from '@/types/table.interfaces';

type TableProps = {
    data: TableData[];
    onJoinClick?: (item: TableData) => void;
    onToValuateClick?: (item: TableData) => void;
    onSetUpEvaluateClick?: (item: TableData) => void;
    onCountEvaluateClick?: (item: TableData) => void;
    onCalculateRatingsClick?: (item: TableData) => void;
    buttonLabel?: string;
};

const BaseTable: React.FC<TableProps> = ({ data, onJoinClick, onToValuateClick, buttonLabel, onSetUpEvaluateClick, onCountEvaluateClick, onCalculateRatingsClick }) => {
    const [headers, setHeaders] = useState<string[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            const initialHeaders = Object.keys(data[0]);
            const filteredHeaders = initialHeaders.filter(header => ![...disabledHeaderTableNames].includes(header));
            setHeaders(filteredHeaders);
        }
    }, [data]);

    const stringifyValue = (value: any): string => {
        const replacer = (key: string, val: any) => {
            if (typeof val === 'bigint') {
                return val.toString();
            }
            return val;
        };

        if (Array.isArray(value)) {
            return value.map(item => {
                let tmp = { ...item }; // Create a shallow copy of the item
                if (item.price) {
                    tmp.price = item.price.toString();
                }
                return JSON.stringify(tmp, replacer);
            }).join(', ');
        } else if (typeof value === 'object' && value !== null) {
            let tmp = { ...value }; // Create a shallow copy of the value
            if (value.price) {
                tmp.price = value.price.toString();
            }
            return JSON.stringify(tmp, replacer);
        } else {
            return String(value);
        }
    };

    const renderValueByHeader = (header: string, value: any) => {
        switch (header) {
            case 'TokenUri':
                return (
                    <a href={value} target="_blank" rel="noopener noreferrer" title={value} className="flex justify-center items-center">
                        {getIconByName('Chrome')}
                    </a>
                );
            case 'TokenAddress':
                return <WalletAddressDisplay address={value} />;
            case 'Validator':
                return <WalletAddressDisplay address={value} />;
            case 'ValidatorsCount':
                return (
                    <div className="flex justify-center items-center">
                        {value} %
                    </div>
                );
            case 'rewardSumInUsd':
                return <div>{value === undefined ? <div className="max-h-2"><Spinner /></div> : value}</div>;
            default:
                return stringifyValue(value);
        }
    };

    return (
        <div className="overflow-y-auto">
            <table className="table-auto w-full text-yellow-200">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="border px-4 py-2">
                                {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                        ))}
                        {onJoinClick && <th className="border px-4 py-2">Show</th>}
                        {onToValuateClick && <th className="border px-4 py-2">Valuate</th>}
                        {onSetUpEvaluateClick && <th className="border px-4 py-2">Setup</th>}
                        {onCountEvaluateClick && <th className="border px-4 py-2">Count</th>}
                        {onCalculateRatingsClick && <th className="border px-4 py-2">Ratings</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header, headerIndex) => (
                                <td key={headerIndex} className={`border py-2 text-center align-middle ${header === 'sourceUrl' ? 'px-10' : 'px-4'}`}>
                                    {renderValueByHeader(header, item[header as keyof TableData])}
                                </td>
                            ))}
                            {onJoinClick && (
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                                        onClick={() => onJoinClick(item)}
                                    >
                                        {buttonLabel || "Show RWA"}
                                    </button>
                                </td>
                            )}
                            {onToValuateClick && (
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onToValuateClick(item)}
                                    >
                                        To Valuate
                                    </button>
                                </td>
                            )}
                            {onSetUpEvaluateClick && (
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onSetUpEvaluateClick(item)}
                                    >
                                        Set Up Evaluate
                                    </button>
                                </td>
                            )}
                            {onCountEvaluateClick && (
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                                        onClick={() => onCountEvaluateClick(item)}
                                    >
                                        Count results
                                    </button>
                                </td>
                            )}
                            {onCalculateRatingsClick && (
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => onCalculateRatingsClick(item)}
                                    >
                                        To CountRatings
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BaseTable;

