import styled from 'styled-components'

export const DialogWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 42px;
  width: 421px;

  h1 {
    color: ${(props) => props.theme['color-neutral-110']};
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;
  }

  h3 {
    color: ${(props) => props.theme['color-neutral-110']};
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.5px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 16px;
    width: 100%;
  }

  #close-button {
    background-color: ${(props) => props.theme['color-secondary-100']};
    height: 42px;
    transition: background-color 0.2s;
  }

  #close-button:hover {
    background-color: ${(props) => props.theme['color-secondary-110']};
  }

  @media (max-width: 768px) {
    padding: 32px 28px;
    width: 100%;
  }
`
