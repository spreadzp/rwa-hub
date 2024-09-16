import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoginPage from '../ui/LoginPage';
import { useRwaHubStore } from '@/libs/store';
import { tokenURI } from '@/libs/web3/web3';
import ErrorModal from '../common/modal/ErrorModal';
import { getValidators, getValuation, hasEvaluated } from '@/libs/web3/rwaValuation';
import QRCodeComponent from './QRCodeComponent';
import Image from 'next/image';

const RwaToValuate: React.FC = () => {
    const pathname = usePathname();
    const { userAddressWallet } = useRwaHubStore();
    const [rwaData, setRwaData] = useState({} as { contractAddress: string, nftId: string }); // TODO: type add chain id
    const [uri, setUri] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isValidatorDidEvaluate, setIsValidatorDidEvaluate] = useState(false);
    const [validators, setValidators] = useState([] as string[]);

    const [normalizedAddressOfValidator, setNormalizedAddressOfValidator] = useState('');
    const rwaTokenAddress = process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS || '';

    useEffect(() => {
        const contentInfo = pathname.split('/')[2];
        const [contractAddress, nftId] = contentInfo.split('-');
        setRwaData({ contractAddress, nftId });
        (async () => {
            try {
                debugger
                if (contractAddress.includes('0x') && nftId) {
                    {
                        const uriToken = await tokenURI(+nftId);
                        setUri(uriToken);
                        const rwaData = await getValuation(+nftId, contractAddress);
                        if (rwaData && rwaData[0] !== '0x') {
                            const uriToken = await tokenURI(+nftId);
                            setUri(uriToken);
                        }
                    }
                }

            } catch (err) {
                console.log(err);
                setErrorMessage('data for this RWA not found');
            }
            try {
                const validatorsToSet = await getValidators();
                console.log("🚀 ~ validators:", validatorsToSet)
                setValidators(validatorsToSet)
                if (userAddressWallet && validatorsToSet.length > 0) {
                    validatorsToSet.forEach((validator) => {
                        if (validator.toLocaleLowerCase() === userAddressWallet.toLocaleLowerCase()) {
                            setNormalizedAddressOfValidator(validator)
                        }
                    })
                }
            } catch (err) {
                console.log(err)
                setErrorMessage('Validators for this RWA not found')
            }
        })();
    }, [pathname, userAddressWallet, rwaTokenAddress, isValidatorDidEvaluate, normalizedAddressOfValidator]);

    useMemo(() => {
        (async () => {
            try {
                if (normalizedAddressOfValidator !== '') {
                    const isEvaluate = await hasEvaluated(+rwaData.nftId, normalizedAddressOfValidator, rwaTokenAddress)
                    console.log("🚀 ~ isEvaluate:", isEvaluate)
                    setIsValidatorDidEvaluate(isEvaluate)
                }
            } catch (err) {
                console.log(err)
                setErrorMessage('')
            }
        })()
    }, [validators, normalizedAddressOfValidator, rwaData, setIsValidatorDidEvaluate, rwaTokenAddress]);



    if (userAddressWallet === "") return <LoginPage />;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-yellow-200">
            <div className="w-full max-w-2xl p-4">
                <div className="mb-4">
                    <div className="font-bold">Contract Address:</div>
                    <div>{rwaData.contractAddress}</div>
                </div>
                <div className="mb-4">
                    <div className="font-bold">NFT ID:</div>
                    <div>{rwaData.nftId}</div>
                </div>
                <div className="mb-4">
                    <div className="font-bold">URI:</div>
                    <div>{uri}</div>
                </div>
                <div className="mb-4">
                    <div className="font-bold">Image:</div>
                    {uri && <Image src={uri} alt="RWA" className="w-full h-auto" width={200} height={200} />}
                </div>
                <QRCodeComponent rwaAddress={rwaData.contractAddress} nftId={rwaData.nftId} />

            </div>
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
        </div>
    );
};

export default RwaToValuate;