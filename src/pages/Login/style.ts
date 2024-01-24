import styled from "styled-components";

export const MainWrapper = styled.main`
  background: ${props => props.theme.white};
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
  }
`

export const ImageContainer = styled.section`
  height: 100vh;
  overflow: hidden;

  img {
    height: 100%;
  }
`

export const LoginContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 13.125rem 7.6875rem 12.5rem 7.6875rem;

  h1 {
    text-align: center;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  // Essa div referencia os inputs do Material UI
  div {
    margin-bottom: 0.5rem;
  }
`

export const LoginWithGoogle = styled.button`
  margin: 2rem 0;
`

export const LoginButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 4px;
  background: ${props => props.theme["color-secondary-100"]};
  color: ${props => props.theme["color-neutral-60"]};
  cursor: pointer;

  font-family: 'Roboto', sans-serif;
  font-weight: medium;
  font-size: 15px;

  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.20), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 0.1s;

  &:hover {
    background: ${props => props.theme["color-secondary-110"]};
  }
`