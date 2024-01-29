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
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;

  form {
    display: flex;
    justify-content: center; //Faz alinhamento vertical
    align-items: center; //Faz alinhamento horizontal
    flex-direction: column;
    width: 517px;
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

  #snackbar {
    position: absolute;
    top: 77px;
  }

  #names-container {
    width: 100%;
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  #login-button {
    background-color: ${(props) => props.theme["color-secondary-100"]};
    width: 100%;
    height: 42px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }

    form {
      width: 100%;
      padding: 0 24px;
    }

    #snackbar {
      top: 49px;
    }

    #names-container {
      flex-direction: column;
    }
  }
`;
