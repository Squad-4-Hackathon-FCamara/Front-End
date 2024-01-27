import styled from "styled-components";

export const PortfolioContainer = styled.main`
  display: block;
  padding: 0 32px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

export const ProfileCard = styled.section`
  display: flex;
  gap: 42px;
  margin: 122px auto 56px auto;
  width: 364px;

  h5 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    color: ${(props) => props.theme["color-neutral-120"]};

    font-family: "Roboto", sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;
  }

  h6 {
    margin: 16px 0 24px 0;
    color: ${(props) => props.theme["color-neutral-130"]};
    opacity: 50%;

    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15px;
  }

  img {
    border-radius: 50%;
    width: 122px;
    height: 122px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  #add-project-button {
    background: ${(props) => props.theme["color-secondary-100"]};
    width: 200px;
    height: 42px;
  }

  #add-project-button p {
    color: ${(props) => props.theme.white};
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0.46px;
    text-transform: uppercase;
  }

  #add-project-button:disabled {
    background: rgba(0, 0, 0, 0.12);

    p {
      color: rgba(0, 0, 0, 0.38);
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    margin: 56px auto 56px auto;
    gap: 16px;
    width: 312px;

    img {
      margin: auto;
    }

    div {
      margin: auto;
    }

    h6 {
      margin: 8px 0;
    }
  }
`;

export const SearchBar = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h6 {
    color: ${(props) => props.theme["color-neutral-130"]};
    opacity: 0.6;

    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.15px;
  }

  // .MuiAutocomplete-root é uma classe do Material UI, visível com o inspetor de elementos do navegador
  // No index, o componente BaseAutocomplete usa essa classe
  .MuiAutocomplete-root {
    width: 513px;
  }

  @media (max-width: 768px) {
    .MuiAutocomplete-root {
      width: 100%;
    }
  }
`;

export const ProjectsList = styled.section`
  margin-top: 40px;
`;

export const AddProjectCard = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 68px 60px;
  cursor: pointer;

  width: 390px;
  height: 258px;
  border-radius: 4px;
  background-color: ${(props) => props.theme["color-neutral-70"]};

  img {
    width: 46px;
    height: 46px;
    margin-bottom: 20px;
  }

  h6 {
    color: ${(props) => props.theme["color-neutral-120"]};

    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.5px;
    opacity: 0.6;
    margin-bottom: 16px;
  }

  p {
    color: ${(props) => props.theme["color-neutral-120"]};

    font-family: "Roboto";
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.25px;
    opacity: 0.6;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 68px 21px;
  }
`;