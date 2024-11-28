import tien from "./founder/tien.jpg";
import hieu from "./founder/hieu.jpg";
import khanh from "./founder/khanh.jpg";
import son from "./founder/son.jpg";
import dung from "./founder/dung.jpg";
import thanh from "./founder/thanh.jpg";
import nami from "./wallet/nami.svg";
import flint from "./wallet/flint.svg";
import eternl from "./wallet/eternl.webp";
import typhon from "./wallet/typhon.svg";
import gero from "./wallet/gero.webp";
import vespr from "./wallet/vespr.png";
import lace from "./wallet/lace.png";
import yoroi from "./wallet/yoroi.png";
import nufi from "./wallet/nufi.png";
import faq from "./banner/faq.jpg";
import logo from "./common/logo.png";
import cardano from "./network/cardano.png";
import metadata from "./utilities/metadata.png";
import storegae from "./utilities/storage.png";
import collection from "./utilities/collection.png";
import marketplace from "./utilities/marketplace.png";
import mintOne from "./utilities/mint-one.png";
import mintMultiple from "./utilities/mint-multiple.png";
import login from "./common/login.png";
import startFromCratch from "./utilities/start-from-scratch.png";
export const founderImage = {
  son: son,
  tien: tien,
  hieu: hieu,
  khanh: khanh,
  dung: dung,
  thanh: thanh,
} as const;

export const appImage = {
  logo: logo,
  login: login,
  cardano: cardano,
  metadata: metadata,
  storegae: storegae,
  collection: collection,
  marketplace: marketplace,
  mintOne: mintOne,
  mintMultiple: mintMultiple,
  startFromCratch: startFromCratch,
} as const;

export const walletImage = {
  nami: nami,
  eternl: eternl,
  gero: gero,
  typhon: typhon,
  flint: flint,
  vespr: vespr,
  lace: lace,
  nufi: nufi,
  yoroi: yoroi,
} as const;

export const bannerImage = {
  faq: faq,
} as const;
