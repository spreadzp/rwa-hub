import * as forge from 'node-forge';

// Generate a new RSA key pair
export function generateKeyPair() {
    const keypair = forge.pki.rsa.generateKeyPair(2048);
    const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
    return { publicKey, privateKey, address: '' };
}

// Encrypt a message using the public key
export function encryptMessage(message: any, publicKeyPem: any) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(forge.util.encodeUtf8(message), 'RSA-OAEP');
    return forge.util.encode64(encrypted);
}

// Decrypt a message using the private key
export function decryptMessage(encryptedMessageBase64: string, privateKeyPem: string) {
    debugger
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const encrypted = forge.util.decode64(encryptedMessageBase64);
    const decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP');
    return forge.util.decodeUtf8(decrypted);
}

// Example usage
// (async () => {
//     // Generate a new key pair
//     const { publicKeyPem, privateKeyPem } = generateKeyPair();

//     // Message to encrypt
//     const message = "Hello, Ethereum!";

//     // Encrypt the message using the public key
//     const encryptedMessageBase64 = encryptMessage(message, publicKeyPem);
//     console.log('Encrypted Message (Base64):', encryptedMessageBase64);

//     // Decrypt the message using the private key
//     const decryptedMessage = decryptMessage(encryptedMessageBase64, privateKeyPem);
//     console.log('Decrypted Message:', decryptedMessage);
// })();