import styled from "styled-components";

export const DialogCloseWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
`;

export const DialogContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 8px 102px 82px 102px;
  width: 1042px;

  img {
    width: 100%;
    margin: 32px 0 64px 0;
  }

  p {
    color: ${(props) => props.theme["color-neutral-120"]};

    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.5px;
  }

  a {
    color: ${(props) => props.theme["color-info-80"]};

    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.5px;
  }
`;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  #user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 25%;
  }

  #user-name {
    display: flex;
    flex-direction: column;
  }

  #tag-chips {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8px;
    width: 25%;
  }

  #avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0;
  }

  h6 {
    color: ${(props) => props.theme["color-neutral-110"]};
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
  }

  h5 {
    color: ${(props) => props.theme["color-neutral-120"]};
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;

    margin: 0 0 8px 0;
  }

  h1 {
    color: ${(props) => props.theme["color-neutral-120"]};
    text-align: center;
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;

    width: 50%;
  }
`;
