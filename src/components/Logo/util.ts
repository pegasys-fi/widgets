import { SupportedChainId } from 'constants/chains'
import { isAddress } from 'utils'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import { LogoTableInput } from './LogoTable'

type Network = 'rollux_tanenbaum' | 'rollux'
function chainIdToNetworkName(networkId: SupportedChainId): Network | undefined {
  switch (networkId) {
    case SupportedChainId.ROLLUX:
      return 'rollux'
    case SupportedChainId.ROLLUX_TANENBAUM:
      return 'rollux_tanenbaum'
    default:
      return 'rollux'
  }
}

export function getAssetsRepoURI(asset: LogoTableInput): string | undefined {
  const networkName = chainIdToNetworkName(asset.chainId)
  if (!networkName) return

  if (asset.isNative)
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/info/logo.png`

  const checksummedAddress = isAddress(asset.address)
  return checksummedAddress
    ? `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${checksummedAddress}/logo.png`
    : undefined
}

export function getNativeLogoURI(chainId: SupportedChainId = SupportedChainId.ROLLUX): string {
  switch (chainId) {
    case SupportedChainId.ROLLUX_TANENBAUM:
    case SupportedChainId.ROLLUX:
      return EthereumLogo
    default:
      return EthereumLogo
  }
}
