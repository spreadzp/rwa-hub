
'use client';

import { useRouter } from 'next/navigation';
import { TableData } from '@/types/table.interfaces';
import React, { useEffect, useState } from 'react';
import BaseTable from '../common/BaseTable';
import { getCurrentTokenId, getTokenURI } from '@/libs/web3/rwaToken';
import { getValuation } from '@/libs/web3/rwaValuation';

const RwaListForValidate: React.FC = () => {
    const [data, setData] = useState<TableData[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchData = async () => {
            const nextNftId = await getCurrentTokenId();
            const rwaIds = Array.from({ length: Number(nextNftId) - 1 }, (_, i) => i + 1);
            console.log("🚀 ~ fetchData ~ rwaIds:", rwaIds)
            await Promise.all(rwaIds.map(async (rwaId) => {
                console.log("🚀 ~ awaitPromise.all ~ rwaId:", rwaId)
                const rwaInfo = await getValuation(rwaId, process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS as string)
                console.log("🚀 ~ awaitPromise.all ~ rwaInfo:", rwaInfo)
                if (rwaInfo[0] !== '0x') {
                    const uriToken = await getTokenURI(rwaId)
                    const rwaData = {
                        NftId: `${rwaId}`, Symbol: 'ETH', ValuatedPrice: '1500',
                        TokenAddress: process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS,
                        Valuating: !rwaInfo[3],
                        TokenUri: uriToken
                    }
                    setData((data) => [...data, rwaData]);
                }

            }))

            // const mockData: TableData[] = [
            //     { NftId: '1', Symbol: 'ETH', ValuatedPrice: '1500', TokenAddress: process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS, TokenUri: 'https://u-news.com.ua/uploads/posts/2024-09/chym-garne-zhyto-yak-syderat-voseny.webp' },
            //     { NftId: '2', Symbol: 'BTC', ValuatedPrice: '30000', TokenAddress: process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS, TokenUri: 'https://u-news.com.ua/uploads/posts/2024-09/chym-garne-zhyto-yak-syderat-voseny.webp' },
            //     { NftId: '3', Symbol: 'LTC', ValuatedPrice: '100', TokenAddress: process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS, TokenUri: 'https://u-news.com.ua/uploads/posts/2024-09/chym-garne-zhyto-yak-syderat-voseny.webp' },
            // ];
            //setData(mockData);
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
            <div className="min-h-screen">
                <h1 className="text-2xl font-bold mb-4 first-line:text-yellow-200">RWA List For Validate</h1>
                <BaseTable
                    data={data}
                    onJoinClick={handleJoinClick}
                    onToValuateClick={handleToValuateClick}
                    buttonLabel="Join RWA"
                />
            </div>
        </div>
    );
};

export default RwaListForValidate;