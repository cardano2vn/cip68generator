"use client";

import { walletImage } from "@/public/images";
import { WalletType } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

declare const window: any;

export const wallets: WalletType[] = [
  {
    name: "Nami",
    image: walletImage.nami,
    api: async function () {
      return await window.cardano.nami.enable();
    },
    checkApi: async function () {
      return await window.cardano.nami;
    },
    downloadApi:
      "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
  },
  {
    name: "Eternl",
    image: walletImage.eternl,
    api: async function () {
      return window.cardano.eternl.enable();
    },
    checkApi: async function () {
      return await window.cardano.eternl;
    },
    downloadApi:
      "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
  },
  {
    name: "Flint",
    image: walletImage.flint,
    api: async function () {
      return await window.cardano.flint.enable();
    },
    checkApi: async function () {
      return await window.cardano.flint;
    },
    downloadApi:
      "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
  },
  {
    name: "Lace",
    image: walletImage.lace,
    api: async function () {
      return await window.cardano.lace.enable();
    },
    checkApi: async function () {
      return await window.cardano.lace;
    },
    downloadApi:
      "https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk",
  },
  {
    name: "Gero",
    image: walletImage.gero,
    api: async function () {
      return await window.cardano.gero.enable();
    },
    checkApi: async function () {
      return await window.cardano.gero;
    },
    downloadApi:
      "https://chrome.google.com/webstore/detail/gerowallet/bgpipimickeadkjlklgciifhnalhdjhe",
  },
  {
    name: "Typhon",
    image: walletImage.typhon,
    api: async function () {
      return await window.cardano.typhon.enable();
    },
    checkApi: async function () {
      return await window.cardano.typhon;
    },
    downloadApi:
      "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
  },
  {
    name: "Vespr",
    image: walletImage.vespr,
    api: async function () {
      return await window.cardano.vespr.enable();
    },
    checkApi: async function () {
      return await window.cardano.vespr;
    },
    downloadApi:
      "https://play.google.com/store/apps/details?id=art.nft_craze.gallery.main",
  },
  {
    name: "Yoroi",
    image: walletImage.yoroi,
    api: async function () {
      return await window.cardano.yoroi.enable();
    },
    checkApi: async function () {
      return await window.cardano.yoroi;
    },
    downloadApi:
      "https://chromewebstore.google.com/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb",
  },
  {
    name: "Nufi",
    image: walletImage.nufi,
    api: async function () {
      return await window.cardano.nufi.enable();
    },
    checkApi: async function () {
      return await window.cardano.nufi;
    },
    downloadApi:
      "https://chromewebstore.google.com/detail/nufi/gpnihlnnodeiiaakbikldcihojploeca",
  },
] as const;

export default wallets;
