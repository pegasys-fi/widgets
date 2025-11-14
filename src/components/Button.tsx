import { Icon } from 'icons'
import { ButtonHTMLAttributes, ComponentProps, ForwardRefExoticComponent, forwardRef, RefAttributes } from 'react'
import styled from 'styled-components/macro'
import { AnimationSpeed, Color } from 'theme'

export const BaseButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: inherit;
  font-weight: inherit;
  height: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;

  :enabled {
    transition: filter ${AnimationSpeed.Fast} linear;
  }

  :disabled {
    cursor: initial;
    filter: opacity(0.6);
  }
`

export default styled(BaseButton)<{ color?: Color }>`
  background-color: ${({ color = 'accentActionSoft', theme }) => theme[color]};
  border: 1px solid transparent;

  :enabled:hover {
    background-color: ${({ color = 'accentActionSoft', theme }) => theme.onHover(theme[color])};
  }
`

const transparentButton = (defaultColor: Color) => styled(BaseButton)<{ color?: Color }>`
  color: ${({ color = defaultColor, theme }) => theme[color]};

  :enabled:hover {
    color: ${({ color = defaultColor, theme }) => theme.onHover(theme[color])};
    * {
      color: ${({ color = defaultColor, theme }) => theme.onHover(theme[color])};
    }
  }
`

export const TextButton = transparentButton('accentActive')

const SecondaryButton = transparentButton('accentActive')

const StyledIconButton = styled(SecondaryButton)`
  height: 1rem;
`

type IconButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  color?: Color
}

export interface IconButtonProps extends IconButtonBaseProps {
  icon: Icon
  iconProps?: ComponentProps<Icon>
}

type IconButtonComponent = ForwardRefExoticComponent<IconButtonProps & RefAttributes<HTMLButtonElement>>

export const IconButton: IconButtonComponent = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon: Icon, iconProps, ...props },
  ref
) {
  return (
    <StyledIconButton {...props} ref={ref}>
      <Icon {...iconProps} />
    </StyledIconButton>
  )
})
