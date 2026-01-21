import { common as koCommon } from './ko/common';
import { home as koHome } from './ko/home';
import { about as koAbout } from './ko/about';
import { product as koProduct } from './ko/product';
import { business as koBusiness } from './ko/business';
import { performance as koPerformance } from './ko/performance';
import { media as koMedia } from './ko/media';
import { contact as koContact } from './ko/contact';

import { common as enCommon } from './en/common';
import { home as enHome } from './en/home';
import { about as enAbout } from './en/about';
import { product as enProduct } from './en/product';
import { business as enBusiness } from './en/business';
import { performance as enPerformance } from './en/performance';
import { media as enMedia } from './en/media';
import { contact as enContact } from './en/contact';

const messages = {
  ko: {
    translation: {
      common: koCommon,
      home: koHome,
      about: koAbout,
      product: koProduct,
      business: koBusiness,
      performance: koPerformance,
      media: koMedia,
      contact: koContact
    }
  },
  en: {
    translation: {
      common: enCommon,
      home: enHome,
      about: enAbout,
      product: enProduct,
      business: enBusiness,
      performance: enPerformance,
      media: enMedia,
      contact: enContact
    }
  }
};

export default messages;
