import styled from "styled-components";

export const PortfolioContainer = styled.main`
  display: flex;
  justify-content: center;
  padding: 0 32px;
`

export const ProfileCard = styled.section`
  display: flex;
  gap: 42px;
  margin: 122px 0 56px 0;
  width: 364px;

  h1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    color: ${props => props.theme["color-neutral-120"]};

    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px; 
  }

  h3 {
    margin: 16px 0 24px 0;
    color: ${props => props.theme["color-neutral-130"]};

    font-family: 'Roboto', sans-serif;
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
    background: ${props => props.theme["color-secondary-100"]};
    width: 200px;
    height: 42px;
  }

  #add-project-button p {
    color: ${props => props.theme.white};
    font-family: 'Roboto', sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 26px;
    letter-spacing: 0.46px;
    text-transform: uppercase; 
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    gap: 16px;

    img {
      margin: auto;
    };

    div {
      margin: auto;
    }
  }
`

export const SearchBar = styled.section``

export const ProjectsList = styled.section``