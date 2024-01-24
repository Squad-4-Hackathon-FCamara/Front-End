import styled from "styled-components";

export const MainWrapper = styled.main`
  background: ${(props) => props.theme.white};
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-between;
  align-items: center;

  a {
    color: ${(props) => props.theme["color-neutral-100"]};

    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15px;

    text-decoration: none;
    margin-top: 18px;
  }
`;

export const ImageContainer = styled.section`
  height: 100vh;
  overflow: hidden;

  img {
    height: 100%;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const RegisterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;

  form {
    display: flex;
    justify-content: center; //Faz alinhamento vertical
    align-items: center; //Faz alinhamento horizontal
    flex-direction: column;
  }

  h1 {
    color: ${(props) => props.theme["color-primary-90"]};
    text-align: center;
    /* [Orange P] Style Guide/H3 */
    font-family: Roboto;
    font-size: 48px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px; /* 83.333% */
    padding-bottom: 32px;
  }

  .MuiFormControl-root {
    margin-bottom: 16px;
    width: 517px;
  }

  #email-input {
    color: ${(props) => props.theme["color-neutral-120"]};
    width: 517px;
  }

  #outlined-adornment-password {
    color: ${(props) => props.theme["color-neutral-120"]};
    width: 517px;
  }

  #register-button {
    background-color: ${(props) => props.theme["color-secondary-100"]};
    width: 517px;
    height: 42px;
    display: flex;
    justify-content: center;

    p {
      color:${(props) => props.theme["color-neutral-60"]} ;
      font-feature-settings: "clig" off, "liga" off;
      /* [Orange P] Style Guide/Button */
      font-family: Roboto;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px; /* 173.333% */
      letter-spacing: 0.46px;
      text-transform: uppercase;
    }
  }
`;
