import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme['color-primary-100']};
  padding: 16px 32px;
  position: fixed;
  width: 100%;
  z-index: 1000;

  height: 73px;

  @media (max-width: 768px) {
    padding: 12px 24px;
  }
`

export const NavigationContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;

  a {
    text-decoration: none;
    color: ${(props) => props.theme['color-neutral-60']};
    margin-left: 24px;

    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.15px;

    transition: color 0.2s;
  }

  a:hover {
    color: ${(props) => props.theme['color-neutral-80']};
  }

  #menu-icon {
    color: ${(props) => props.theme.white};
  }

  @media (max-width: 768px) {
    gap: 9px;
  }
`

export const ProfileContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 16px 32px;
  gap: 8px;

  img {
    width: 40px !important;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  #notifications-icon {
    color: ${(props) => props.theme['color-neutral-60']};
  }

  @media (max-width: 768px) {
    img {
      margin-left: 9px;
    }
  }
`
