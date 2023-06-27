import { SupportedChainId } from 'constants/chains'
import { constructSameAddressMap } from 'utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = {
  [SupportedChainId.ROLLUX_TANENBAUM]: '0x817C777DEf2Fd6ffE2492C6CD124985C78Ee9235',
  [SupportedChainId.ROLLUX]: '0x48023b16c3e81AA7F6eFFbdEB35Bb83f4f31a8fd',
}

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.ROLLUX]: '0x48023b16c3e81AA7F6eFFbdEB35Bb83f4f31a8fd',
  [SupportedChainId.ROLLUX_TANENBAUM]: '0x92D073bcb65Acd28aE49c8b749e7b44615948db3'
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap('0xd93c60A8E0F53361524698Cce1BBb65E080b8976')

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {}
