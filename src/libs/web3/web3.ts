// lib/web3.ts

import { ethers, Network } from 'ethers';
import { RwaToken_ABI } from './abis';
import { EnsPlugin } from 'ethers';

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


export async function tokenURI(nftId: number): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, RwaToken_ABI.abi, provider);
        const uri = await contract.tokenURI(nftId);
        return uri.toString();
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}

// Function to mint an ERC-721 token
export async function mintToken(to: string, uri: string): Promise<string> {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        // console.log('window.ethereum :>>', window.ethereum)
        // const network = Network.from('sepolia');
        // network.attachPlugin(new EnsPlugin());

        // const provider = new JsonRpcProvider(url, sepolia);
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        console.log("🚀 ~ evaluateRwa ~ signer:", signer)
        debugger
        const contract: any = new ethers.Contract(CONTRACT_ADDRESS, RwaToken_ABI.abi, signer);
        const contractWithSigner = contract.connect(signer)
        const tx = await contractWithSigner.mint(to, uri);
        const receipt = await tx.wait();
        return receipt.hash;
    } catch (error) {
        console.error("Error minting token:", error);
        throw error;
    }
}

export async function getUserWalletBalanceEth(address: string): Promise<string> {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
    }
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        console.log("🚀 ~ getUserWalletBalanceEth ~ balance:", balance)
        return balance.toString();
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }


} 