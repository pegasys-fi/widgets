import 'assets/fonts.scss'
import './external'

import { mix, rgba, transparentize } from 'polished'
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import { DefaultTheme, ThemeProvider as StyledProvider } from 'styled-components/macro'
import { opacify } from 'utils/opacify'

import { Layer } from './layer'
import type { Colors, Theme, ThemeBorderRadius } from './theme'

export * from './animations'
export * from './dynamic'
export * from './layer'
export type { Color, Colors, Theme } from './theme'
export * as ThemedText from './type'

const white = 'hsl(0, 0%, 100%)'
const black = 'hsl(0, 0%, 0%)'

const brandLight = 'hsl(328, 97%, 53%)'
const brandDark = 'hsl(221, 96%, 64%)'

const blueButton = '#153D6F'
const deep = '#081120'
const input = '#0B172C'
const gray900 = '#171923'
const cyanText = '#00D9EF'
const purpleMain = '#665EE1'
const blue400 = '#4299E1'
const gray50 = '#F7FAFC'

export const brand = brandLight

const stateColors = {
  active: 'hsl(221, 96%, 64%)',
  activeSoft: 'hsla(221, 96%, 64%, 0.24)',
  success: 'hsl(145, 63.4%, 41.8%)',
  warningSoft: 'hsla(44, 86%, 51%, 0.24)',
  critical: '#FA2B39',
  criticalSoft: 'rgba(250, 43, 57, 0.12);',
}

export const lightTheme: Colors = {
  // surface
  accent: brandLight,
  accentSoft: rgba(brandLight, 0.24),
  container: 'hsl(0, 0%, 100%)',
  module: gray50,
  interactive: 'hsl(227, 70%, 95%)',
  outline: 'hsla(225, 18%, 44%, 0.24)',
  dialog: white,
  scrim: 'hsla(224, 37%, 8%, 0.6)',

  // text
  onAccent: white,
  primary: 'hsl(224, 37%, 8%)',
  secondary: 'hsl(227, 18%, 55%)',
  hint: 'hsl(226, 24%, 67%)',
  onInteractive: black,

  deepShadow: `0px 10px 24px ${opacify(24, '#00D9EF')}, 10px 0px 24px ${opacify(24, '#8C15E8')}`,
  networkDefaultShadow: 'hsla(328, 97%, 53%, 0.12)',

  // state
  ...stateColors,
  warning: 'hsla(41, 100%, 35%, 1)',
  error: 'hsla(356, 95%, 57%, 1)',

  currentColor: 'currentColor',
  accentActive: purpleMain,
  backgroundScrim: opacify(60, gray900),
  accentActionSoft: opacify(12, purpleMain),
  accentActiveSoft: opacify(24, blue400),
}

export const darkTheme: Colors = {
  // surface
  accent: blueButton,
  accentSoft: rgba(brandDark, 0.24),
  container: 'hsla(224, 37%, 8%, 1)',
  module: input,
  interactive: 'hsla(223, 28%, 22%, 1)',
  outline: 'hsl(224, 33%, 16%)',
  dialog: black,
  scrim: 'hsla(224, 33%, 16%, 0.5)',

  // text
  onAccent: white,
  primary: white,
  secondary: 'hsl(227, 21%, 67%)',
  hint: 'hsla(225, 18%, 44%)',
  onInteractive: white,

  deepShadow: `0px 10px 24px ${opacify(24, '#00D9EF')}, 10px 0px 24px ${opacify(24, '#8C15E8')}`,
  networkDefaultShadow: 'hsla(221, 96%, 64%, 0.16)',

  // state
  ...stateColors,
  warning: 'hsl(44, 86%, 51%)',
  error: 'hsla(5, 97%, 71%, 1)',

  currentColor: 'currentColor',
  accentActive: cyanText,
  backgroundScrim: opacify(72, deep),
  accentActionSoft: opacify(24, blueButton),
  accentActiveSoft: opacify(24, cyanText),
}

/**
 * Common border radius values in em
 */
const defaultBorderRadius = {
  large: 1.5,
  medium: 1,
  small: 0.75,
  xsmall: 0.5,
}

export const defaultTheme = {
  borderRadius: defaultBorderRadius,
  zIndex: {
    modal: Layer.DIALOG,
  },
  fontFamily: {
    font: '"Inter", sans-serif',
    variable: '"InterVariable", sans-serif',
  },
  fontFamilyCode: 'IBM Plex Mono',
  tokenColorExtraction: false,
  ...lightTheme,
}

export function useSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
  const [systemTheme, setSystemTheme] = useState(prefersDark.matches ? darkTheme : lightTheme)
  prefersDark.addEventListener('change', (e) => {
    setSystemTheme(e.matches ? darkTheme : lightTheme)
  })
  return systemTheme
}

const ThemeContext = createContext<DefaultTheme>(toDefaultTheme(defaultTheme))

export interface ThemeProps {
  theme?: Theme
}

export function Provider({ theme, children }: PropsWithChildren<ThemeProps>) {
  const contextTheme = useContext(ThemeContext)
  const value = useMemo(() => {
    return toDefaultTheme({
      ...contextTheme,
      ...theme,
    } as Required<Theme>)
  }, [contextTheme, theme])
  return (
    <ThemeContext.Provider value={value}>
      <StyledProvider theme={value}>{children}</StyledProvider>
    </ThemeContext.Provider>
  )
}

function toDefaultTheme(theme: Required<Theme>): DefaultTheme {
  return {
    ...theme,
    borderRadius: clamp(theme.borderRadius ? (theme.borderRadius as ThemeBorderRadius) : defaultBorderRadius),
    onHover: (color: string) =>
      color === theme.primary ? transparentize(0.4, theme.primary) : mix(0.06, theme.primary, color),
  }

  function clamp(value: ThemeBorderRadius): ThemeBorderRadius {
    const clampNum = (num: number) => Math.min(Math.max(num, 0), 1)
    return {
      large: clampNum(value.large),
      medium: clampNum(value.medium),
      small: clampNum(value.small),
      xsmall: clampNum(value.xsmall),
    }
  }
}
