import { SupportedChainId } from 'constants/chains'
import { isAddress } from 'utils'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import BnbLogo from '../../assets/svg/bnb-logo.svg'
import CeloLogo from '../../assets/svg/celo_logo.svg'
import MaticLogo from '../../assets/svg/matic-token-icon.svg'
import { LogoTableInput } from './LogoTable'

type Network = 'rollux_testnet'
function chainIdToNetworkName(networkId: SupportedChainId): Network | undefined {
  switch (networkId) {
    case SupportedChainId.ROLLUX_TESTNET:
      return 'rollux_testnet'
    default:
      return 'rollux_testnet'
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

export function getNativeLogoURI(chainId: SupportedChainId = SupportedChainId.ROLLUX_TESTNET): string {
  switch (chainId) {
    case SupportedChainId.ROLLUX_TESTNET:
      return EthereumLogo
    default:
      return EthereumLogo
  }
}
