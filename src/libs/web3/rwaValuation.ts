
import { ethers } from 'ethers';
import { RwaValuation_ABI } from './abis';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_RWA_VAL_CONTRACT_ADDRESS || '';

// Function to get the balance of an ERC-721 token
export async function getBalanceOf(address: string): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        const balance = await contract.balanceOf(address);
        return balance.toString();
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}

export async function getValidators(): Promise<string[]> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        return await contract.getValidators();
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}


export async function getValuation(nftId: number, rwaTokenAddress: string): Promise<any> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        const valuation = await contract.getValuation(nftId, rwaTokenAddress);
        return valuation;
    } catch (error) {
        console.error("Error fetching valuation:", error);
        throw error;
    }
}


export async function evaluateRwa(tokenId: number, encodedValueOfValidator: string, rwaTokenAddress: any) {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        console.log("🚀 ~ evaluateRwa ~ signer:", signer)
        const contract: any = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, signer);
        const contractWithSigner = contract.connect(signer)
        const result = await contractWithSigner['evaluateRwa'](tokenId, encodedValueOfValidator, rwaTokenAddress);
        return result;

    } catch (error) {
        console.error("Error evaluating RWA:", error);
        //throw error;
    }
}

export async function hasEvaluated(nftId: number, validator: string, rwaToken: string): Promise<boolean> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        const result = await contract.hasEvaluated(nftId, validator, rwaToken);
        debugger
        return result;
    } catch (error) {
        console.error("Error evaluating RWA:", error);
        throw error;
    }
}

export async function getValidatorRating(validatorAddress: string): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        const result = await contract.getValidatorRating(validatorAddress);
        return result;
    } catch (error) {
        console.error("Error evaluating RWA:", error);
        throw error;
    }
}

export async function getAdminAddress(): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        const result = await contract.admin();
        return result;
    } catch (error) {
        console.error("Error evaluating RWA:", error);
        throw error;
    }
}


export async function setUpRwaToValuate(nftId: string, publicKey: string, rwaToken: string): Promise<any> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const contract: any = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, signer);
        const contractWithSigner = contract.connect(signer)
        const result = await contractWithSigner['setUpRwaToValuate'](nftId, publicKey, rwaToken);
        return result;
    } catch (error) {
        console.error("Error setUpRwaToValuate:", error);
        throw error;
    }
}
export async function getEncodedValuation(nftId: string, validatorAddress: string, rwaToken: string): Promise<any> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        const result = await contract.getEncodedValuation(nftId, validatorAddress, rwaToken);
        return result;
    } catch (error) {
        console.error("Error setUpRwaToValuate:", error);
        throw error;
    }
}

export async function setDecodedValuation(nftId: string, validatorsAddresses: string[], decodedValuations: number[], privateKey: string, rwaToken: string): Promise<any> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract: any = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, signer);
        const contractWithSigner = contract.connect(signer)
        const result = await contractWithSigner['setDecodedValuation'](nftId, validatorsAddresses, decodedValuations, privateKey, rwaToken);
        return result;
    } catch (error) {
        console.error("Error setUpRwaToValuate:", error);
        throw error;
    }
}

export async function calculateRatings(nftId: string, rwaToken: string): Promise<any> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaValuation_ABI.abi, provider);
        const result = await contract.calculateRatings(nftId, rwaToken);
        return result;
    } catch (error) {
        console.error("Error setUpRwaToValuate:", error);
        throw error;
    }
}