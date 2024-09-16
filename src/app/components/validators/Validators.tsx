'use client';

import { useRouter } from 'next/navigation';
import { TableData } from '@/types/table.interfaces';
import React, { useEffect, useState } from 'react';
import BaseTable from '../common/BaseTable';
import StarryBackground from '../common/StarryBackground';
import { getCurrentTokenId, getRwaSymbol, getTokenURI } from '@/libs/web3/rwaToken';
import { getValidatorRating, getValidators, getValuation } from '@/libs/web3/rwaValuation';

const Validators: React.FC = () => {
    const [data, setData] = useState<TableData[]>([]);
    const router = useRouter();
    const rwaTokenAddress = process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS as string
    useEffect(() => {
        const fetchData = async () => {
            const tempData: TableData[] = [];
            const allValidators = await getValidators();
            await Promise.all(allValidators.map(async (validator) => {
                const rank = await getValidatorRating(validator);
                const rwaData: TableData = {
                    Validator: validator,
                    ValidatorRank: Number(rank),
                };
                tempData.push(rwaData);
            }
            ));

            setData(tempData);
        };

        fetchData();
    }, []);

    const handleJoinClick = (item: TableData) => {
        router?.push(`/rwa/${item.TokenAddress}-${item.NftId}`);
    };

    const handleToValuateClick = (item: TableData) => {
        router?.push(`/rwa-to-valuate/${item.TokenAddress}-${item.NftId}`);
    };

    return (
        <div className="p-4">
            <StarryBackground />
            <div className="min-h-screen">
                <h1 className="text-2xl font-bold mb-4 text-yellow-200">Validators List</h1>
                <BaseTable
                    data={data}

                />
            </div>
        </div>
    );
};

export default Validators;