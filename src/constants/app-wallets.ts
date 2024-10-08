'use client';

import configs from '@/configs';
import images from '@/assets/images';

/* eslint-disable @typescript-eslint/no-explicit-any */
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
        downloadApi: configs.wallet.nami,
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
        downloadApi: configs.wallet.eternl,
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
        downloadApi: configs.wallet.flint,
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
        downloadApi: configs.wallet.lace,
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
        downloadApi: configs.wallet.gero,
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
        downloadApi: configs.wallet.typhon,
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
        downloadApi: configs.wallet.vespr,
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
        downloadApi: configs.wallet.yoroi,
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
        downloadApi: configs.wallet.nufi,
    },
] as const;

export default wallets;
