'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import images from '@/public/images';
declare const window: any;

export const wallets = [
    {
        name: 'Nami',
        image: images.nami,
        api: async function () {
            return await window.cardano.nami.enable();
        },
        checkApi: async function () {
            return await window.cardano.nami;
        },
        downloadApi:
            'https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo',
    },
    {
        name: 'Eternl',
        image: images.eternl,
        api: async function () {
            return window.cardano.eternl.enable();
        },
        checkApi: async function () {
            return await window.cardano.eternl;
        },
        downloadApi:
            'https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka',
    },
    {
        name: 'Flint',
        image: images.flint,
        api: async function () {
            return await window.cardano.flint.enable();
        },
        checkApi: async function () {
            return await window.cardano.flint;
        },
        downloadApi:
            'https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj',
    },
    {
        name: 'Lace',
        image: images.lace,
        api: async function () {
            return await window.cardano.lace.enable();
        },
        checkApi: async function () {
            return await window.cardano.lace;
        },
        downloadApi:
            'https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk',
    },
    {
        name: 'Gero',
        image: images.gero,
        api: async function () {
            return await window.cardano.gero.enable();
        },
        checkApi: async function () {
            return await window.cardano.gero;
        },
        downloadApi:
            'https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe',
    },
    {
        name: 'Typhon',
        image: images.typhon,
        api: async function () {
            return await window.cardano.typhon.enable();
        },
        checkApi: async function () {
            return await window.cardano.typhon;
        },
        downloadApi:
            'https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh',
    },
    {
        name: 'Vespr',
        image: images.vespr,
        api: async function () {
            return await window.cardano.vespr.enable();
        },
        checkApi: async function () {
            return await window.cardano.vespr;
        },
        downloadApi: 'https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main',
    },
    {
        name: 'Yoroi',
        image: images.yoroi,
        api: async function () {
            return await window.cardano.yoroi.enable();
        },
        checkApi: async function () {
            return await window.cardano.yoroi;
        },
        downloadApi:
            'https://chromewebstore.google.com/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb',
    },
    {
        name: 'Nufi',
        image: images.nufi,
        api: async function () {
            return await window.cardano.nufi.enable();
        },
        checkApi: async function () {
            return await window.cardano.nufi;
        },
        downloadApi:
            'https://chromewebstore.google.com/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca',
    },
] as const;

export default wallets;
