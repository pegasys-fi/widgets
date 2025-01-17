import { useSwapInfo, useSwitchSwapCurrencies } from 'hooks/swap'
// eslint-disable-next-line no-restricted-imports
import { RefreshCcw } from 'react-feather'
import styled, { useTheme } from 'styled-components/macro'
import { Layer } from 'theme'

import Button from '../Button'

const Underlayer = styled.div`
  background-color: ${({ theme }) => theme.container};
  border-radius: ${({ theme }) => theme.borderRadius.medium}em;
  height: 48px;
  left: 50%;
  position: absolute;
  /* Adjust by 2px to account for border display. */
  transform: translate(-50%, calc(-50% - 2px));
  width: 48px;
  z-index: ${Layer.OVERLAY};
`

const StyledReverseButton = styled(Button)`
  align-items: center;
  background-color: ${({ theme }) => theme.module};
  border: 4px solid ${({ theme }) => theme.container};
  border-radius: ${({ theme }) => theme.borderRadius.medium}rem;
  display: flex;
  justify-content: center;
  width: 100%;
`

export default function ReverseButton() {
  const { error } = useSwapInfo()
  const isDisabled = error !== undefined
  const switchCurrencies = useSwitchSwapCurrencies()
  const theme = useTheme()

  return (
    <Underlayer>
      <StyledReverseButton disabled={isDisabled} onClick={switchCurrencies}>
        <RefreshCcw color={theme.accentActive} size={16} />
      </StyledReverseButton>
    </Underlayer>
  )
}
