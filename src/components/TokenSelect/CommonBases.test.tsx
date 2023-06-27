import { SupportedChainId } from '@pollum-io/sdk-core'
import { BASES_TO_CHECK_TRADES_AGAINST } from 'constants/routing'
import { USDC_ROLLUX } from 'constants/tokens'
import { renderComponent, userEvent, waitFor } from 'test'

import CommonBases from './CommonBases'

describe('CommonBases', () => {
  const itRendersCorrectCurrenciesForChainId = (chainId: SupportedChainId) => {
    const tokens = BASES_TO_CHECK_TRADES_AGAINST[chainId]
    const component = renderComponent(<CommonBases chainId={chainId} onSelect={jest.fn()} />)
    tokens.forEach((token) => {
      expect(component.getAllByText(token.symbol as string)).toBeTruthy()
    })
  }

  it('calls the select function on click', () => {
    const callback = jest.fn()
    const component = renderComponent(<CommonBases chainId={SupportedChainId.ROLLUX} onSelect={callback} />)
    component.getByText('USDC').click()
    expect(callback).toHaveBeenCalledWith(USDC_ROLLUX)
  })

  it('calls the select function on enter', async () => {
    const user = userEvent.setup()
    const callback = jest.fn()
    const component = renderComponent(<CommonBases chainId={SupportedChainId.ROLLUX} onSelect={callback} />)
    await user.tab()
    await user.type(component.container, '{enter}')
    waitFor(() => {
      expect(callback).toHaveBeenCalledWith(USDC_ROLLUX)
    })
  })

  it('renders correct currencies, mainnet', () => {
    itRendersCorrectCurrenciesForChainId(SupportedChainId.ROLLUX)
  })

  // it('renders correct currencies, optimism', () => {
  //   itRendersCorrectCurrenciesForChainId(SupportedChainId.OPTIMISM)
  // })

  // it('renders correct currencies, arbitrum', () => {
  //   itRendersCorrectCurrenciesForChainId(SupportedChainId.ARBITRUM_ONE)
  // })

  // it('renders correct currencies, polygon', () => {
  //   itRendersCorrectCurrenciesForChainId(SupportedChainId.POLYGON)
  // })

  // it('renders correct currencies, celo', () => {
  //   itRendersCorrectCurrenciesForChainId(SupportedChainId.CELO)
  // })
})
