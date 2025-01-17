import optimismLogoUrl from 'assets/svg/optimism_logo.svg'
import ms from 'ms.macro'

import { SupportedChainId, SupportedL1ChainId, SupportedL2ChainId } from './chains'

export const STANDARD_L1_BLOCK_TIME = ms`12s`

export enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly blockWaitMsBeforeWarning?: number
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly infoLink: string
  readonly logoUrl: string
  /*
   * The label and native currency symbol as listed on the "safe" list used by MetaMask: https://chainid.network/chains.json.
   * If undefined, label and nativeCurrency.symbol may be safely used.
   * MetaMask shows a warning when adding a chain using anything but its "safe" label.
   */
  readonly safe?: {
    label?: string
    symbol?: string
  }
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH'
    symbol: string // e.g. 'gorETH'
    decimals: 18 // e.g. 18
  }
  readonly color?: string
  readonly backgroundColor?: string
}

export interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
}

export interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
}

export type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} &
  { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.ROLLUX]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://rollux.com',
    docs: 'https://rollux.com/',
    explorer: 'https://explorer.rollux.com/',
    infoLink: 'https://info.pegasys.fi/#/rollux/',
    label: 'Rollux',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://rollux.com',
    helpCenterUrl: 'https://rollux.com',
    nativeCurrency: { name: 'Syscoin', symbol: 'SYS', decimals: 18 },
    color: '#FF0420',
    backgroundColor: '#ff042029',
  },
  [SupportedChainId.ROLLUX_TANENBAUM]: {
    networkType: NetworkType.L2,
    blockWaitMsBeforeWarning: ms`25m`,
    bridge: 'https://rollux.com',
    docs: 'https://rollux.com/',
    explorer: 'https://rollux.tanenbaum.io/',
    infoLink: 'https://info.pegasys.fi/#/rollux/',
    label: 'Rollux Testnet',
    logoUrl: optimismLogoUrl,
    statusPage: 'https://rollux.com',
    helpCenterUrl: 'https://rollux.com',
    nativeCurrency: { name: 'Syscoin', symbol: 'SYS', decimals: 18 },
    color: '#FF0420',
    backgroundColor: '#ff042029',
  },
}

export function getChainInfo(chainId: SupportedL1ChainId): L1ChainInfo
export function getChainInfo(chainId: SupportedL2ChainId): L2ChainInfo
export function getChainInfo(chainId: SupportedChainId): L1ChainInfo | L2ChainInfo
export function getChainInfo(
  chainId: SupportedChainId | SupportedL1ChainId | SupportedL2ChainId | number | undefined
): L1ChainInfo | L2ChainInfo | undefined

/**
 * Overloaded method for returning ChainInfo given a chainID
 * Return type varies depending on input type:
 * number | undefined -> returns chaininfo | undefined
 * SupportedChainId -> returns L1ChainInfo | L2ChainInfo
 * SupportedL1ChainId -> returns L1ChainInfo
 * SupportedL2ChainId -> returns L2ChainInfo
 */
export function getChainInfo(chainId: any): any {
  if (chainId) {
    return CHAIN_INFO[chainId] ?? undefined
  }
  return undefined
}

export const MAINNET_INFO = CHAIN_INFO[SupportedChainId.ROLLUX]
export function getChainInfoOrDefault(chainId: number | undefined) {
  return getChainInfo(chainId) ?? MAINNET_INFO
}

export function isSupportedChainId(chainId: number | undefined): chainId is SupportedChainId {
  if (chainId === undefined) return false
  return !!SupportedChainId[chainId]
}
