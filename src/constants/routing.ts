// a list of tokens by chain
import { NativeCurrency, Token } from '@pollum-io/sdk-core'

import { SupportedChainId } from './chains'
import {
  // AMPL,
  // CEUR_CELO,
  // CMC02_CELO,
  // CUSD_CELO,
  DAI_ROLLUX,
  // DAI_ARBITRUM_ONE,
  // DAI_OPTIMISM,
  // DAI_POLYGON,
  // ETH2X_FLI,
  // FEI,
  // FRAX,
  // FXS,
  nativeOnChain,
  // PORTAL_ETH_CELO,
  // PORTAL_USDC_CELO,
  // renBTC,
  // rETH2,
  // sETH2,
  // SWISE,
  // TRIBE,
  // USDC_BNB_CHAIN,
  USDC_ROLLUX,
  // USDC_POLYGON,
  USDT_ROLLUX,
  // USDT_ARBITRUM_ONE,
  // USDT_BNB_CHAIN,
  // USDT_OPTIMISM,
  // USDT_POLYGON,
  // WBTC,
  // WBTC_ARBITRUM_ONE,
  // WBTC_OPTIMISM,
  // WETH_POLYGON,
  WRAPPED_NATIVE_CURRENCY,
} from './tokens'

type ChainTokenList = {
  readonly [chainId: number]: Array<Token | NativeCurrency>
}

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, [value]])
    .filter(Boolean)
)

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.ROLLUX]: [
    nativeOnChain(SupportedChainId.ROLLUX),
    DAI_ROLLUX,
    USDC_ROLLUX,
    USDT_ROLLUX,
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.ROLLUX],
  ],
}
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {}
