import styled from 'styled-components'

export const MainWrapper = styled.main`
  background: ${(props) => props.theme.white};
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-between;
  align-items: center;

  #register-link {
    color: ${(props) => props.theme['color-neutral-100']};

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15px;

    text-decoration: none;
    margin-top: 18px;
    cursor: pointer;
  }
`

export const ImageContainer = styled.section`
  height: 100vh;
  overflow: hidden;

  img {
    height: 100%;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`

export const LoginContainer = styled.section`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;

  h1 {
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 48px;
    line-height: 40px;

    color: ${(props) => props.theme['color-primary-90']};
  }

  h2 {
    margin-bottom: 1.5rem;

    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;

    color: ${(props) => props.theme['color-neutral-110']};
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 517px;
  }

  #login-button {
    /* background-color: ${(props) => props.theme['color-secondary-100']}; */
    width: 100%;
    height: 42px;
    /* transition: background-color 0.2s; */
  }

  /* #login-button:hover {
    background-color: ${(props) => props.theme['color-secondary-110']};
  } */

  #snackbar {
    position: absolute;
    top: 77px;
  }

  // Media query para responsividade
  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }

    #snackbar {
      top: 49px;
    }

    form {
      width: 100%;
      padding: 0 24px;
    }
  }
`

export const LoginWithGoogle = styled.button`
  padding: 12px 8px;
  margin: 2rem auto;
  width: 175px;
  height: 40px;
  border: var(--none, 0.5px) solid transparent;
  border-radius: 2px;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${(props) => props.theme.white};
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  img {
    max-width: 18px;
    max-height: 18px;
  }

  transition: border 0.1s;
  &:hover {
    border: var(--none, 0.5px) solid #4285f4;
    outline: 3px solid #4285f41a;
    box-shadow: none;
  }

  &:active {
    background: #eeeeee;
    border: var(--none, 0.5px) solid transparent;
    outline: 3px solid transparent;
  }

  &:focus {
    outline: 3px solid #4285f41a;
    box-shadow: none;
  }
`

export const LoginButton = styled.button`
  padding: 8px;
  margin-top: 16px;
  max-width: 517px;
  height: 42px;
  border: none;
  border-radius: 4px;
  background: ${(props) => props.theme['color-secondary-100']};
  background-position: center;
  color: ${(props) => props.theme['color-neutral-60']};
  cursor: pointer;

  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 15px;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 0.1s;

  &:hover {
    background: ${(props) => props.theme['color-secondary-110']};
  }

  &:active {
  }
`
