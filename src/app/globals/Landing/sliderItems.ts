import posterImage from './../../../../assets/rwa-logo.png';
import treeImage from './../../../../assets/tree.png';
import rwaWorldImage from './../../../../assets/tree-rwa-world.png';
import adminImage from './../../../../assets/admin.png';
import valuateImage from './../../../../assets/valuate-proc.png';
import rwaPlanetImage from './../../../../assets/tree-rwa-planet.png';

import { PosterProps } from './Poster';

const sliderItems: PosterProps[] = [
    {
        title: "RWA-HUB Overview",
        imageUrl: posterImage,
        description: "RWA-HUB is a revolutionary platform for tokenizing real-world assets, starting with trees. Through blockchain technology, we bridge the gap between physical assets and the digital world, ensuring transparent ownership and environmental sustainability.",
        features: [
            "ERC-721 Tokenization of Trees.",
            "Decentralized asset management and appraisal.",
            "Blockchain-based ownership tracking.",
            "Environmental impact tracking and reporting.",
            "Secure, decentralized storage for asset data."
        ],
        callToAction: "with RWA-HUB and join the future of sustainable asset tokenization.",
        joinUrl: "/",
        activeLabel: "Get Started"
    },
    {
        title: "Tokenizing Trees",
        imageUrl: treeImage,
        description: "Tokenize real-world trees on the blockchain and contribute to both financial and environmental sustainability. By owning a tokenized tree, you directly participate in the preservation of our planet’s forests.",
        features: [
            "Tokenize trees as unique ERC-721 assets.",
            "Secure ownership through blockchain technology.",
            "Track environmental impact and carbon offset.",
            "Contribute to reforestation efforts.",
            "Earn rewards for sustainable asset ownership."
        ],
        callToAction: "a tree and be part of a greener future with RWA-HUB.",
        joinUrl: "/rwa-create",
        activeLabel: "Tokenize"
    },
    {
        title: "Global Tree Network",
        imageUrl: rwaWorldImage,
        description: "Join a decentralized global network of tree owners and environmental stewards. With RWA-HUB, tokenized assets from around the world are securely managed and tracked on the blockchain.",
        features: [
            "Global network of tokenized trees.",
            "Decentralized asset management and security.",
            "Access to global environmental impact data.",
            "Collaborate with other tree owners and environmentalists.",
            "Track ownership history and asset performance."
        ],
        callToAction: "our global tree network and contribute to global sustainability.",
        joinUrl: "/rwa-list",
        activeLabel: "Join"
    },
    {
        title: "Administrator and Appraisal",
        imageUrl: adminImage,
        description: "RWA-HUB administrators manage the onboarding of new assets and ensure a fair appraisal process. Independent appraisers help evaluate the true value of each tokenized tree, ensuring transparent and accurate pricing.",
        features: [
            "Administrator-controlled asset onboarding.",
            "Fair and transparent appraisal process.",
            "Independent appraisers for value determination.",
            "Automated valuation based on average assessments.",
            "Reward system for accurate appraisals."
        ],
        callToAction: "our platform and contribute to the fair tokenization of real-world assets.",
        joinUrl: "/rwa-list",
        activeLabel: "Participate"
    },
    {
        title: "Appraisal Process",
        imageUrl: valuateImage,
        description: "Our decentralized appraisal process ensures that tokenized assets are accurately evaluated by independent experts. Appraisers who provide the most accurate valuations are rewarded for their precision and insight.",
        features: [
            "Decentralized appraisers for accurate valuations.",
            "Fair value determination based on expert assessments.",
            "Rewards for appraisers with precise estimates.",
            "Data stored securely on the blockchain.",
            "Transparent process for verifying appraisals."
        ],
        callToAction: "in the appraisal process and help ensure fair valuations of tokenized assets.",
        joinUrl: "/validators",
        activeLabel: "Participate"
    },
    {
        title: "Planet-Wide Impact",
        imageUrl: rwaPlanetImage,
        description: "By tokenizing real-world trees, RWA-HUB is making a planet-wide impact. Every tokenized tree contributes to global efforts to preserve forests, combat climate change, and promote environmental sustainability.",
        features: [
            "Contribute to global reforestation efforts.",
            "Track the carbon offset of your tokenized trees.",
            "Support climate change mitigation through asset ownership.",
            "Collaborate with like-minded environmentalists worldwide.",
            "Make a lasting impact on the planet through blockchain technology."
        ],
        callToAction: "with RWA-HUB and make a global impact through tree tokenization.",
        joinUrl: "/",
        activeLabel: "Get Involved"
    }
];

export default sliderItems;
