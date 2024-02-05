import styled from 'styled-components'

export const PortfolioContainer = styled.main`
  display: block;
  padding: 0 32px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`

export const ProfileCard = styled.section`
  margin: 122px auto 120px auto;
  width: 744px;

  h5 {
    max-width: auto;
    color: ${(props) => props.theme['color-primary-90']};

    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    font-weight: 400;
    line-height: 34px;
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    margin: 56px auto 56px auto;
    width: 312px;

    div {
      margin: auto;
    }

    h5 {
      margin: 8px 0;
      font-size: 24px;
      line-height: 24px;
      width: auto;
    }
  }
`

export const SearchBar = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ProjectsList = styled.section`
  margin-top: 40px;
  gap: 24px;
`

interface ProjectCardProps {
  $thumbnailurl: string
}

export const ProjectCard = styled.div<ProjectCardProps>`
  display: flex;
  flex-direction: column;
  align-items: end;
  cursor: pointer;

  width: 100%;
  height: 258px;
  border-radius: 4px;
  background-color: ${(props) => props.theme['color-neutral-70']};
  background-image: url(${(props) => props.$thumbnailurl});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 16px;

  #project-menu-button {
    background: ${(props) => props.theme['color-secondary-70']};
    width: 28px;
    height: 28px;
    transition: background-color 0.2;
  }

  #project-menu-button:hover {
    background: ${(props) => props.theme['color-secondary-80']};
  }
`

export const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 40px 0;

  #tag-chips {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8px;
  }

  #avatar {
    display: flex;
    align-items: center;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  h5 {
    color: ${(props) => props.theme['color-neutral-110']};
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15px;
  }

  #name-tag {
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    img {
      width: 40px;
      height: 40px;
    }

    span {
      flex-direction: column;
      align-items: start;
      gap: 4px;
    }
  }
`
