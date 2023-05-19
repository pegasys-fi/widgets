import { Ether, NativeCurrency, Token, WETH9 } from '@pollum-io/sdk-core'

import { UNI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'

export const USDC_ROLLUX_TANENBAUM = new Token(
  SupportedChainId.ROLLUX_TANENBAUM,
  '0x2Be160796F509CC4B1d76fc97494D56CF109C3f1',
  6,
  'USDC',
  'USD//C'
)

export const USDC_ROLLUX = new Token(
  SupportedChainId.ROLLUX,
  '0xdBB59E294A93487822d1d7e164609Cd59d396fb5',
  6,
  'USDC',
  'USD//C'
)

export const DAI_ROLLUX = new Token(
  SupportedChainId.ROLLUX,
  '0x5de737495Fe261cc9d6D32E00196d5e4ef43594D',
  18,
  'DAI',
  'Dai Stablecoin'
)

export const USDC: { [chainId in SupportedChainId]: Token } = {
  [SupportedChainId.ROLLUX_TANENBAUM]: USDC_ROLLUX_TANENBAUM,
  [SupportedChainId.ROLLUX]: USDC_ROLLUX,

}

export const USDT_ROLLUX = new Token(
  SupportedChainId.ROLLUX,
  '0x4DFc340487bbec780bA8458e614b732d7226AE8f',
  6,
  'USDT',
  'Tether USD'
)

export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.ROLLUX_TANENBAUM]: new Token(
    SupportedChainId.ROLLUX_TANENBAUM,
    UNI_ADDRESS[SupportedChainId.ROLLUX_TANENBAUM],
    18,
    'PSYS',
    'Pegasys'
  ),
  [SupportedChainId.ROLLUX]: new Token(
    SupportedChainId.ROLLUX,
    UNI_ADDRESS[SupportedChainId.ROLLUX],
    18,
    'PSYS',
    'Pegasys'
  ),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
  [SupportedChainId.ROLLUX_TANENBAUM]: new Token(
    SupportedChainId.ROLLUX_TANENBAUM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WSYS',
    'Wrapped Syscoin'
  ),
  [SupportedChainId.ROLLUX]: new Token(
    SupportedChainId.ROLLUX,
    '0x4200000000000000000000000000000000000006',
    18,
    'WSYS',
    'Wrapped Syscoin'
  ),

}
export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {

  const nativeCurrency: NativeCurrency | Token = ExtendedEther.onChain(chainId)

  return (cachedNativeCurrency[chainId] = nativeCurrency)
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } = {
  USDC: {
    [SupportedChainId.ROLLUX_TANENBAUM]: USDC_ROLLUX_TANENBAUM.address,
    [SupportedChainId.ROLLUX]: USDC_ROLLUX.address,
  },
}
