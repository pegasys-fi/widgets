import styled, { keyframes, useTheme } from 'styled-components/macro'

export const GifLoaderWrapper = styled.div<{ size: string }>`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const RotationStyle = styled.svg<{ size: string; stroke: string }>`
  animation: 2s ${rotateAnimation} linear infinite;
  height: ${(props) => props.size};
  stroke: ${(props) => props.stroke};
  width: ${(props) => props.size};

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
`

export const StyledSVG = styled.svg<{ size: string; stroke?: string; fill?: string }>`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  path {
    background: ${({ theme }) => theme.secondary};
    fill: ${({ fill }) => fill};
    stroke: ${({ stroke }) => stroke};
  }
`

export const StyledRotatingSVG = styled(StyledSVG)`
  ${RotationStyle}
`
export function LoaderGif({
  size = '16px',
  stroke,
  strokeWidth,
  gif,
  ...rest
}: {
  size?: string
  stroke?: string
  strokeWidth?: number
  gif?: string
  [k: string]: any
}) {
  const theme = useTheme()

  if (gif) {
    return (
      <GifLoaderWrapper size={size} {...rest}>
        <img src={gif} alt="Loading gif" />
      </GifLoaderWrapper>
    )
  }

  return (
    <StyledRotatingSVG
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      stroke={stroke ?? theme.accentActive}
      {...rest}
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375"
        strokeWidth={strokeWidth ?? '2.5'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledRotatingSVG>
  )
}
