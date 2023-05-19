import { SupportedChainId } from 'constants/chains'
import { constructSameAddressMap } from 'utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = {
  [SupportedChainId.ROLLUX_TANENBAUM]: '0x817C777DEf2Fd6ffE2492C6CD124985C78Ee9235',
  [SupportedChainId.ROLLUX]: '0x8e59ED2DF847Ad3d19624480Db5B2B3Ba27fC9a8',
}

export const MULTICALL_ADDRESS: AddressMap = constructSameAddressMap('0xcba1683e1f0ba5061573cce7c1a73a80c3827cef')

export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap('0xfB2529aE4D41ae6c8B6782a5CBb56E24141133D8')

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {}
