export const appConfig = {
    title: 'cip68_nft',
    description: '',
};
export const uploadConfig = {
    maxFiles: 50,
    maxSize: 5,
};
export const ipfsConfig = {
    uploadApi: 'http://18.143.169.117:5001/',
    gateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://ipfs.io/ipfs/',
};
