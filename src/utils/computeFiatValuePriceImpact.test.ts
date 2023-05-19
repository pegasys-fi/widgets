import { CurrencyAmount, Percent } from '@pollum-io/sdk-core'
import { DAI_ROLLUX, USDC_ROLLUX } from 'constants/tokens'

import { computeFiatValuePriceImpact } from './computeFiatValuePriceImpact'

describe('computeFiatValuePriceImpact', () => {
  it('should return undefined', () => {
    expect(computeFiatValuePriceImpact(null, null)).toBeUndefined()
  })

  it('should return 0: same currency, same value', () => {
    expect(
      computeFiatValuePriceImpact(
        CurrencyAmount.fromRawAmount(USDC_ROLLUX, 100),
        CurrencyAmount.fromRawAmount(USDC_ROLLUX, 100)
      )
    ).toEqual(new Percent(0, 100))
  })

  it('should return 0.5: same currency, different values', () => {
    expect(
      computeFiatValuePriceImpact(
        CurrencyAmount.fromRawAmount(USDC_ROLLUX, 100),
        CurrencyAmount.fromRawAmount(USDC_ROLLUX, 150)
      )?.toFixed(2)
    ).toEqual(new Percent(-50, 100).toFixed(2))
  })

  it('should return undefined: different currencies', () => {
    expect(
      computeFiatValuePriceImpact(
        CurrencyAmount.fromRawAmount(USDC_ROLLUX, 100),
        CurrencyAmount.fromRawAmount(DAI_ROLLUX, 150)
      )?.toFixed(2)
    ).toEqual(undefined)
  })
})
