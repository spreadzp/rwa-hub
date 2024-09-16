import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
    rwaAddress: string;
    nftId: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ rwaAddress, nftId }) => {
    const [copied, setCopied] = useState(false);

    const qrCodeUrl = `https://rwa-hub.vercel.app/rwa/${rwaAddress}-${nftId}`;

    const handleCopyClick = () => {
        navigator.clipboard.writeText(qrCodeUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        });
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <QRCodeSVG value={qrCodeUrl} size={256} />
            <p>{qrCodeUrl}</p>
            <button onClick={handleCopyClick}>
                {copied ? 'Copied!' : 'Copy QR Code URL'}
            </button>
        </div>
    );
};

export default QRCodeComponent;