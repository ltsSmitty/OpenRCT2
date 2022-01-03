/// <reference path="../lib/openrct2.d.ts" />

import main from './main';

registerPlugin({
  name: 'Ride Price Manager',
  version: '1.3.2',
  authors: ['mgovea', 'Sadret', 'kscheel'],
  type: 'remote',
  licence: 'MIT',
  main,
});
