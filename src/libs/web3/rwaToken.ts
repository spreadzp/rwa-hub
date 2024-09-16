
import { ethers } from 'ethers';
import { RwaToken_ABI } from './abis';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_RWA_CONTRACT_ADDRESS || '';

// Function to get the balance of an ERC-721 token
export async function getBalanceOf(address: string): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaToken_ABI.abi, provider);
        const balance = await contract.balanceOf(address);
        return balance.toString();
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}

export async function getCurrentTokenId(): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaToken_ABI.abi, provider);
        const tokenId = await contract.getCurrentTokenId();
        return tokenId.toString();
    } catch (error) {
        console.error("Error fetching tokenId:", error);
        throw error;
    }
}

export async function getTokenURI(tokenId: number): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaToken_ABI.abi, provider);
        const tokenURI = await contract.tokenURI(tokenId);
        return tokenURI;
    } catch (error) {
        console.error("Error fetching tokenURI:", error);
        throw error;
    }
}

export async function getRwaSymbol(tokenAddress: string): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(tokenAddress, RwaToken_ABI.abi, provider);
        const name = await contract.symbol();
        return name;
    } catch (error) {
        console.error("Error fetching name:", error);
        throw error;
    }
}