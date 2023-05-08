import { SupportedChainId } from 'constants/chains'
import { constructSameAddressMap } from 'utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x817C777DEf2Fd6ffE2492C6CD124985C78Ee9235')

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.ROLLUX_TESTNET]: '0xCbA1683e1f0BA5061573CCE7C1A73a80C3827cef',
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.ROLLUX_TESTNET]: '0xfB2529aE4D41ae6c8B6782a5CBb56E24141133D8',
}

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {

}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {

}
