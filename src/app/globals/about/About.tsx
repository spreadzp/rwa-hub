import StarryBackground from '@/app/components/common/StarryBackground';
import React from 'react';
import Collaboration from '../Landing/Collaboration';

const About: React.FC = () => {
    return (
        <>
            <StarryBackground />
            <div className="min-h-screen  justify-center items-center">
                <div className="container mx-auto p-6 text-white space-y-6">
                    <h1 className="text-4xl font-bold text-center mb-4">About RWA-HUB</h1>
                    <p className="text-center max-w-2xl">
                        **RWA-HUB** is a cutting-edge decentralized application designed to tokenize real-world assets, starting with trees, on the blockchain. By bridging the gap between physical and digital assets, we enable secure, transparent, and sustainable ownership of assets while promoting environmental conservation.
                    </p>
                    <p className="text-center max-w-2xl">
                        Our mission is to offer a decentralized platform where users can tokenize and manage real-world assets like trees. By valuing both the environmental and financial impact of assets, we drive global sustainability while making asset ownership accessible to everyone.
                    </p>

                    <h2 className="text-2xl font-bold text-center mb-2">Core Features</h2>
                    <ul className="list-disc pl-5 text-center max-w-xl mx-auto space-y-2">
                        <li>ERC-721 Tokenization of Trees</li>
                        <li>Decentralized Appraisal and Valuation System</li>
                        <li>Environmental Impact Measurement and Reporting</li>
                        <li>Secure, Transparent Blockchain Integration</li>
                        <li>Decentralized File Storage for Asset Data</li>
                        <li>Smart Contract-Based Ownership and Transfers</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-center mb-2">Our Business Model</h2>
                    <p className="text-center max-w-2xl">
                        **RWA-HUB** generates revenue through tree token sales, transaction fees on tokenized asset exchanges, and commissions on appraiser services. Our model incentivizes both asset preservation and decentralized ownership, promoting active participation in sustainable asset management.
                    </p>

                    <h2 className="text-2xl font-bold text-center mb-2">Our Team</h2>
                    <p className="text-center max-w-2xl">
                        The **RWA-HUB** team is composed of blockchain developers, environmental experts, and appraiser specialists. Together, we are committed to driving innovation in the tokenization of real-world assets while ensuring security, transparency, and environmental impact.
                    </p>

                    <h2 className="text-2xl font-bold text-center mb-2">Contact Us</h2>
                    <div className="text-center">
                        <Collaboration />
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
