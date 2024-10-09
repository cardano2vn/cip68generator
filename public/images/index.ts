import tien from './founder/tien.jpg';
import hieu from './founder/hieu.jpg';
import khanh from './founder/khanh.jpg';
import son from './founder/son.jpg';
import dung from './founder/dung.jpg';

import nami from './wallet/nami.svg';
import flint from './wallet/flint.svg';
import eternl from './wallet/eternl.webp';
import typhon from './wallet/typhon.svg';
import gero from './wallet/gero.webp';
import vespr from './wallet/vespr.png';
import lace from './wallet/lace.png';
import yoroi from './wallet/yoroi.png';
import nufi from './wallet/nufi.png';

import logo from './common/logo.png';

import cardano from './network/cardano.png';

export const founders = {
    son: son,
    tien: tien,
    hieu: hieu,
    khanh: khanh,
    dung: dung,
} as const;

const images = {
    logo: logo,

    /* wallet-begin */
    nami: nami,
    eternl: eternl,
    gero: gero,
    typhon: typhon,
    flint: flint,
    vespr: vespr,
    lace: lace,
    nufi: nufi,
    yoroi: yoroi,
    /* wallet-end */

    /* network-begin */
    cardano: cardano,
    /* network-end */
} as const;

export default images;
