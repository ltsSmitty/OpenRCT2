/// <reference path="../lib/openrct2.d.ts" />

const namespace = 'RidePriceManager';
const configPrefix = `${namespace}.`;

const goodValueEnabled = `${configPrefix}goodValueEnabled`;
const ignoreFreeRidesEnabled = `${configPrefix}ignoreFreeRidesEnabled`;
const lazyTaxFactor = `${configPrefix}lazyTaxFactor`;
const pluginEnabled = `${configPrefix}pluginEnabled`;
const unboundPriceEnabled = `${configPrefix}unboundPriceEnabled`;

const defaults = {
  goodValueEnabled: false,
  ignoreFreeRidesEnabled: true,
  lazyTaxFactor: 0,
  pluginEnabled: true,
  unboundPriceEnabled: false,
};

type LazyTaxOption = { s: string, n: number };
const lazyTaxOptions: LazyTaxOption[] = [
  { s: '0%', n: 0.00 },
  { s: '5%', n: 0.05 },
  { s: '10%', n: 0.10 },
  { s: '15%', n: 0.15 },
  { s: '20%', n: 0.20 },
  { s: '30%', n: 0.30 },
  { s: '40%', n: 0.40 },
  { s: '50%', n: 0.50 },
];

const config = {
  /**
   * When enabled, prices will be about 1/4 as high,
   * but guests will think think the ride is good value.
   */
  getGoodValueEnabled(): boolean {
    return context.sharedStorage.get(goodValueEnabled, defaults.goodValueEnabled);
  },

  setGoodValueEnabled(v: boolean) {
    return context.sharedStorage.set(goodValueEnabled, v);
  },

  /**
   * Having free transport rides has certain benefits.
   * This setting tells the plugin to ignore free rides.
   */
  getIgnoreFreeRidesEnabled(): boolean {
    return context.sharedStorage.get(ignoreFreeRidesEnabled, defaults.ignoreFreeRidesEnabled);
  },

  setIgnoreFreeRidesEnabled(v: boolean) {
    return context.sharedStorage.set(ignoreFreeRidesEnabled, v);
  },

  /**
   * You probably make more money from using this plugin.
   * The Lazy Tax makes the plugin slightly more balanced.
   * 0.3 is a discount of 30%, so the price will be 70% of the recommended price.
   */
  getLazyTaxFactor(): number {
    return context.sharedStorage.get(lazyTaxFactor, defaults.lazyTaxFactor);
  },

  setLazyTaxFactor(v: number) {
    return context.sharedStorage.set(lazyTaxFactor, v);
  },

  /**
   * This can disable the plugin from within the game.
   * Ride prices will only be changed if this is enabled.
   */
  getPluginEnabled(): boolean {
    return context.sharedStorage.get(pluginEnabled, defaults.pluginEnabled);
  },

  setPluginEnabled(v: boolean) {
    return context.sharedStorage.set(pluginEnabled, v);
  },

  /**
   * Via the UI, you can set a price up to $20.
   * This setting allows the plugin to set arbitrarily high prices.
   */
  getUnboundPriceEnabled(): boolean {
    return context.sharedStorage.get(unboundPriceEnabled, defaults.unboundPriceEnabled);
  },

  setUnboundPriceEnabled(v: boolean) {
    return context.sharedStorage.set(unboundPriceEnabled, v);
  },
};

export default config;
export { lazyTaxOptions, LazyTaxOption };
