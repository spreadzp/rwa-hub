'use client';

import { useRouter } from 'next/navigation';
import { TableData } from '@/types/table.interfaces';
import React, { useEffect, useState } from 'react';
import BaseTable from '../common/BaseTable';
import StarryBackground from '../common/StarryBackground';
import { getCurrentTokenId, getRwaSymbol, getTokenURI } from '@/libs/web3/rwaToken';
import { calculateRatings, getAdminAddress, getEncodedValuation, getValidators, getValuation, setDecodedValuation, setUpRwaToValuate } from '@/libs/web3/rwaValuation';
import Title, { TitleEffect, TitleSize } from '../common/Title';
import { useRwaHubStore } from '@/libs/store';
import { decryptMessage, generateKeyPair } from '@/libs/forge';
import ErrorModal from '../common/modal/ErrorModal';
import SuccessModal from '../common/modal/SuccessModal';
import { ValidatorData } from '@/types/validators.type';


const RwaList: React.FC = () => {
    const [dataForTable, setData] = useState<any[]>([]);
    const { userAddressWallet } = useRwaHubStore();
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [validatorsData, setValidatorsData] = useState([] as ValidatorData[]);
    const router = useRouter();

    const rwaTokenAddress = process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS as string
    useEffect(() => {
        (async () => {
            const adminAddress = await getAdminAddress();
            console.log("🚀 ~ fetchData ~ adminAddress:", adminAddress)
            debugger
            if (userAddressWallet && userAddressWallet.toLocaleLowerCase() === adminAddress.toLocaleLowerCase()) {
                setIsAdmin(true)
            }
        })()
    }, [userAddressWallet, setIsAdmin])
    useEffect(() => {
        const fetchData = async () => {
            const nextNftId = await getCurrentTokenId();
            const rwaIds = Array.from({ length: Number(nextNftId) - 1 }, (_, i) => i + 1);
            const tempData: TableData[] = [];
            const allValidators = await getValidators();
            allValidators.map((validator) => {
                const item = {} as ValidatorData
                item.validator = validator
                setValidatorsData(() => [item])
            })


            await Promise.all(rwaIds.map(async (rwaId) => {
                const rwaInfo = await getValuation(rwaId, rwaTokenAddress);
                console.log("🚀 ~ awaitPromise.all ~ rwaInfo:", rwaInfo);
                if (rwaInfo[0] !== '0x') {
                    const uriToken = await getTokenURI(rwaId);
                    const rwaSymbol = await getRwaSymbol(rwaTokenAddress)
                    const rwaData: TableData = {
                        NftId: `${rwaId}`,
                        Symbol: rwaSymbol,
                        ApprovedPrice: rwaInfo[2],
                        TokenAddress: rwaInfo[5],
                        Valuating: rwaInfo[5] !== '0x0000000000000000000000000000000000000000' && !rwaInfo[2],
                        ValidatorsCount: allValidators?.length > 0 ? (rwaInfo[4].length / allValidators.length) * 100 : 0,
                        TokenUri: uriToken
                    };
                    tempData.push(rwaData);
                }
            }));

            setData(tempData);
        };

        fetchData();
    }, []);

    const handleJoinClick = (item: TableData) => {
        router?.push(`/rwa/${item.TokenAddress}-${item.NftId}`);
    };

    const handleToValuateClick = async (item: TableData) => {
        router?.push(`/rwa-to-valuate/${item.TokenAddress}-${item.NftId}`);

    }

    const setupEvaluate = async (item: TableData) => {
        try {
            const keys = generateKeyPair()
            localStorage.setItem(`${item.NftId}-keys`, JSON.stringify(keys))
            const tx = await setUpRwaToValuate(item.NftId as string, keys.publicKey, item.TokenAddress as string);
            setSuccessMessage(`Successfully setup RWA #${item.NftId} to valuate. Transaction hash: ${tx.hash}`)
        } catch (err) {
            console.log(err)
        }
    };

    const countEvaluated = async (data: TableData) => {
        const keys = JSON.parse(localStorage.getItem(`${data.NftId}-keys`) as string)
        if (keys) {
            await Promise.all(validatorsData.map(async (item, index) => {
                try {
                    const valuation = await getEncodedValuation(data.NftId as string, item.validator, data.TokenAddress as string);
                    console.log("🚀 ~ handleToValuateClick ~ valuation:", valuation);
                    if (valuation) {
                        const tempData = [...validatorsData]
                        tempData[index].encodedValuation = valuation
                        const decodedValue = decryptMessage(valuation, keys.privateKey)
                        console.log("🚀 ~ awaitPromise.all ~ decodedValue:", decodedValue)
                        tempData[index].decodedValuation = +decodedValue
                        setValidatorsData(tempData)
                    };

                } catch (err) {
                    console.log(err)
                }
            }))
            if (validatorsData[0].decodedValuation) {
                debugger
                const decodedValidatorsData = validatorsData.map((item) => item.decodedValuation);
                const listValidators = validatorsData.map((item) => item.validator);
                const tx = await setDecodedValuation(data.NftId as string, listValidators, decodedValidatorsData, keys.privateKey, data.TokenAddress as string);
                await tx.wait()
                if (tx) {
                    setSuccessMessage(`Successfully evaluated RWA #${data.NftId}. Transaction hash: ${tx.hash}  `)

                }

            }

        }

    };
    const calculateRatingValidators = async (data: TableData) => {
        try {
            const ratingTx = await calculateRatings(data.NftId as string, data.TokenAddress as string)
            await ratingTx.wait()
            if (ratingTx.hash) {
                setSuccessMessage(`Successfully evaluated RWA #${data.NftId}. Transaction hash: ${ratingTx.hash}  `)
            }
        } catch (err) {
            console.log(err)
            setErrorMessage('Failed to evaluate RWA')
        }

    }

    return (
        <div className="statistic p-4 bg-white bg-opacity-20 text-white">
            <Title
                titleName="RWA List"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Gradient}
            />
            <StarryBackground />
            {isAdmin ? <div >
                <BaseTable
                    data={dataForTable}
                    onJoinClick={handleJoinClick}
                    onSetUpEvaluateClick={(item: TableData) => setupEvaluate(item)}
                    onCountEvaluateClick={(item: TableData) => countEvaluated(item)}
                    onCalculateRatingsClick={(item: TableData) => calculateRatingValidators(item)}
                />
            </div> :
                <div className="flex flex-col items-center justify-center min-h-screen text-yellow-200">
                    <BaseTable
                        data={dataForTable}
                        onJoinClick={handleJoinClick}
                        onToValuateClick={handleToValuateClick}
                        buttonLabel="Show RWA"
                    />
                </div>
            }

            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}

        </div >
    );
};

export default RwaList;