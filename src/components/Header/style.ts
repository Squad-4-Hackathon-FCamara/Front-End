import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme["color-primary-100"]};
  padding: 16px 32px;

  height: 73px;
`

export const NavigationContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;

  a {
    text-decoration: none;
    color: ${props => props.theme["color-neutral-60"]};
    margin-left: 24px;

    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.15px; 
  }
`

export const ProfileContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  gap: 8px;

  img {
    width: 40px !important;
    height: 40px;
    border-radius: 50%;
  }

  #notifications-icon {
    color: ${props => props.theme["color-neutral-60"]}
  }
`