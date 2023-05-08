/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  ROLLUX_TESTNET = 57000,

}

export enum ChainName {
  ROLLUX_TESTNET = 'rollux-testnet'
}

export const CHAIN_NAMES_TO_IDS: { [chainName: string]: SupportedChainId } = {
  [ChainName.ROLLUX_TESTNET]: SupportedChainId.ROLLUX_TESTNET
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]

export const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [
  SupportedChainId.ROLLUX_TESTNET
]

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS = [
  SupportedChainId.ROLLUX_TESTNET
] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]

// export function isPolygonChain(chainId: number): chainId is SupportedChainId.POLYGON | SupportedChainId.POLYGON_MUMBAI {
//   return chainId === SupportedChainId.POLYGON || chainId === SupportedChainId.POLYGON_MUMBAI
// }
